import express from 'express'
import { createProductsRouter } from '../routers/productsRouter.js'
import {Server as HttpServer} from 'http'
import { Server as IOServer } from 'socket.io'
import Products from '../controllers/products.js'
import {logger as logger} from './logger.js'
import {mailethereal as sendMail} from './sendmail.js' //mailing
//import {twilioClient as twilioClient} from './sendsms.js' //messaging and whatsapp

import MessageMongoDB from '../controllers/messagesMongoDb.js'
import ProductsDB from '../controllers/productsDB.js'
import ProductsMongoDB from '../controllers/productsMongoDb.js'
import { 
  mongodbRemote as configmongodbRemote, 
  mongodbLocal as configmongodbLocal,
  mysql as configMysql,
  maxQuantityRandom as maxQtyRandom
} from '../controllers/config.js'
import UserMongoDB from '../controllers/usersMongoDb.js'
import ProductsFirebase from '../controllers/productsFirebase.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'

//**************PASSPORT*****************
import bCrypt from 'bCrypt'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { config } from 'process'

//import facebookStrategy from 'passport-facebook'

//**************PROCESS*****************
import { inspect } from 'util'
import { fork } from 'child_process'
import cluster from 'cluster'
import CPUs from 'os'
import compression  from  'compression'


//**************VARIABLES*****************
let productsDB;
let messageDB = new MessageMongoDB(configmongodbRemote.connectionString, configmongodbRemote.connectionLabel);
//let UserDB = messageDB;
let UserDB = new UserMongoDB(configmongodbRemote.connectionString, configmongodbRemote.connectionLabel);
//let messageDB = new MessageMongoDB(configmongodbLocal.connectionString, configmongodbLocal.connectionLabel);
//let UserDB = new UserMongoDB(configmongodbLocal.connectionString, configmongodbLocal.connectionLabel);


//**************CONSTANTS*****************
//const PORT = 8081;
const PORT = parseInt(process.argv[2]) || 8080;
const persistence = 6;
const phoneValue = "+"
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const messages = []
const advacedOptions = {userNewUrlParser: true, useUnifiedTopology: true}
//const FacebookStrategy = facebookStrategy.Strategy;
const numCPUs = CPUs.cpus().length;
//DATABASE
const users = [];


//**************Select Database**************
switch(persistence) {
  case 0: //Memory
    productsDB = new Products();
     break;
  case 1: //FileSystem
    //productsDB = new File('./../products.txt');
    break;
  case 2: //MySQL Local
    productsDB = new ProductsDB(configMysql);
    break;
  case 3: //MySQL DBSaaS
    // En pruebas DBSaaS
    productsDB = new ProductsDB(configMysql);
    break;
  case 4: 
    productsDB = new ProductsDB(configSqlite3);
    break;
  case 5: //Mongo Local
    productsDB = new ProductsMongoDB(configmongodbLocal.connectionString, configmongodbLocal.connectionLabel);
    break;
  case 6: //Mongo DBSaaS
    productsDB = new ProductsMongoDB(configmongodbRemote.connectionString, configmongodbRemote.connectionLabel);
    break;
  case 7: //Firebase
    productsDB = new ProductsFirebase();
    break;
  default:
    // code block
}



 /* ------------------ PASSPORT LOCAL-------------------- */

 passport.use('register', new LocalStrategy({ passReqToCallback: true }, 
  async (req, username, password, done) => {
    //const { direccion } = req.body
    //users = UserDB.read();
    const usuario = await UserDB.readOne(username);
    //const usuario = users.find(usuario => usuario.username == username)
    console.log(usuario)
    if (usuario) {
      return done(null, false); //'already registered')
    }

    const user = {
      username: username,
      password: createHash(password),
      email: req.body.email,
      age: req.body.age,
      address:req.body.address,
      phone: req.body.phone,
      avatar: req.body.avatar
    }

    console.log('Antes del add en mongo');
    console.log(user);
    UserDB.add(user)
    //users.push(user)
    console.log(user);

    return done(null, user)
}));


passport.use('login', new LocalStrategy( async (username, password, done) => {
  const user = await UserDB.readOne(username);

  if (!user) {
    return done(null, false)
  }

  if (!isValidPassword(user, password)) {
    return done(null, false)
  }

  user.contador = 0
  console.log('login with user');
  console.log(user);
  return done(null, user);
}));

passport.serializeUser(function(user, done) {
  console.log('serialize');
  console.log(user);
  done(null, user.username);
});

passport.deserializeUser(async function(username, done) {
  const user = await UserDB.readOne(username)
  done(null, user);
});


/* --------------------- MIDDLEWARE --------------------------- */
app.use(cookieParser())
app.use(session({
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

/* ------------------ PASSPORT -------------------- */
app.use(passport.initialize());
app.use(passport.session());
/* ------------------------------------------------ */

//indicates that we will use ejs
app.set('view engine', 'ejs');
app.set("views", "./views");

//express rendering
app.use('/', createProductsRouter())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

/* --------------------- AUTH --------------------------- */

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}


/* --------------------- ROUTES --------------------------- */
// REGISTER
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' }))

app.get('/failregister', (req, res) => {
  res.render('register-error', {});
})

app.get('/', (req, res) => {
  logger.info("Passing by get /")
  //console.log("get /");
  if (req.isAuthenticated()) {
      res.redirect('/data')
  } else {
      res.redirect('/login')
  }
})

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/data' }))

app.get('/faillogin', (req, res) => {
  res.render('login-error', {});
})


// DATA
app.get('/data', async (req, res) => {
  if (req.isAuthenticated()) {
      //reinicio contador
      if (!req.user.contador) req.user.contador = 0
      req.user.contador++
      const prod = await productsDB.read();

      //BEGIN: EMAILING AND MESSAGING
      if (req.user.email){
        const cuentaDePrueba = req.user.email
        const asunto = 'Login'
        const mensajeHtml = `Usuario que ingresa: ${req.user.username}, Fecha: ${new Date().toLocaleDateString()} y Hora: ${new Date().toLocaleTimeString()}`

        const info = await sendMail({
          to: cuentaDePrueba,
          subject: asunto,
          html: mensajeHtml
        })

        console.log(info)
      }
      //END: EMAILING AND MESSAGING
  
      res.render('guardarSocket', {
        products: prod,
        user: req.user,
        contador: req.user.contador
      });
  }
  else {
      res.redirect('/login')
  }
})



/* --------- LOGOUT ---------- */
app.get('/logout', async (req, res) => {
  let lastUser = req.user;

  //BEGIN: EMAILING AND MESSAGING
  if (lastUser.email){
    const cuentaDePrueba = lastUser.email
    const asunto = 'Logout'
    const mensajeHtml = `Usuario que sale: ${lastUser.username}, Fecha: ${new Date().toLocaleDateString()} y Hora: ${new Date().toLocaleTimeString()}`

    const info = await sendMail({
      to: cuentaDePrueba,
      subject: asunto,
      html: mensajeHtml
    })

    console.log(info)
  }
  //END: EMAILING AND MESSAGING

  req.logout();
  res.render('logout', {user: lastUser});
})


//socket connection
io.on('connection', socket => {
  console.log('New user connected!')
  socket.emit('messages', messages)

  //When click insert from user
  socket.on('boton', async function(newProduct) { 
    console.log('Click del usuario');

    await productsDB.add(newProduct); 
    let valid =  await productsDB.read();
    console.log(valid);

    io.sockets.emit('productsToClient', newProduct);
  })

  //When User confirm an Order, send email to administrator 
  socket.on('order', async function(newOrder) { 
    console.log('Orden del usuario');
    console.log(newOrder.order);

    //BEGIN: emailing, messagin, whatsapp
    if (newOrder){
      const cuentaDePrueba = newOrder.useremail
      const asunto = 'Nuevo pedido de: ' + newOrder.username + ' email: ' + newOrder.useremail
      let body = '';
      newOrder.order.forEach(element=>{
          body = body + `${element.quantity} unidades de ${element.title} \n`
      })

      const info = await sendMail({
        to: cuentaDePrueba,
        subject: asunto,
        html: body
      })

      //sending wapp
      /*twilioClient.messages.create({ 
          from: 'whatsapp:+14155238886',
          body: asunto,
          to: 'whatsapp:' + phoneValue })
      .then(messages => console.log(messages.sid))
      .catch(messages => console.log(messages))*/
    }
    //END: emailing, messaging, whatsapp
  })


  //When chat send message
  socket.on('messages', async function(data) { 
    messages.push(data);

    //BEGIN SEND SMS
    /*const from = '+13236415819'
    const to = phoneValue
    let body = '';
    if (data.text.includes('administrador')){
      body = `Mensaje:  ${data.text},  enviado por: ${data.name}`
      const info = await twilioClient.messages.create({ body, from, to })
      console.log(info);}
    else
      console.log('sin palabra administrador no envía sms');*/
    //END SMS

    logger.info('Getting message from socket %s',data)
    await messageDB.add(data); 
    let valid =  await messageDB.read();
    logger.info('Getting valid message from socket %s', valid);
 
    io.sockets.emit('messages', messages)
  })
})

//Process
process.on('exit', (code)=>{
  logger.warn('About to exit with code: %s', code);
})


//Server connection start
const server = httpServer.listen(PORT, ()=>{
  console.log(`HTTP Server listening on port: ${server.address().port}`)
})

server.on('error', error => {
  console.log(error.message)
})


//functions
let createHash = (password)=> {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

let isValidPassword = (user, password)=>{
  return bCrypt.compareSync(password, user.password);
}