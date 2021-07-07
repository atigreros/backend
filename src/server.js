import express from 'express'
import {Server as HttpServer} from 'http'
import { Server as IOServer } from 'socket.io'
import Products from '../controllers/products.js'

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
import passport from 'passport'
import facebookStrategy from 'passport-facebook'

//**************PAROCESS*****************
import { inspect } from 'util'
import { fork } from 'child_process'
import cluster from 'cluster'
import CPUs from 'os'
/*import { waitForDebugger } from 'inspector'
import { config } from 'process'*/


//**************VARIABLES*****************
let productsDB;
let messageDB = new MessageMongoDB(configmongodbLocal.connectionString, configmongodbLocal.connectionLabel);
let UserDB = new UserMongoDB(configmongodbLocal.connectionString, configmongodbLocal.connectionLabel);

//**************CONSTANTS*****************
const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const messages = []
const advacedOptions = {userNewUrlParser: true, useUnifiedTopology: true}
const persistence = 5;
const FacebookStrategy = facebookStrategy.Strategy;
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


/* ------------------ PASSPORT FACEBOOK -------------------- */
let FACEBOOK_CLIENT_ID = '332225778310685';
let FACEBOOK_CLIENT_SECRET = 'a9bca61479654d390714ed2530db7a3d';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
}, function (accessToken, refreshToken, userProfile, done) {
    console.log(userProfile)
    return done(null, userProfile);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

//express rendering
//app.use('/', createProductsRouter())


/* --------------------- AUTH --------------------------- */

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/')
  }
}


/* --------------------- ROUTES --------------------------- */

app.get('/', (req, res) => {
  console.log("get /");
  if (req.isAuthenticated()) {
      res.redirect('/data')
  } else {
      res.redirect('/login')
  }
})

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/faillogin'
}));


// LOGIN
app.get('/login', (req, res) => {
  res.render('login');
});

//app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/data' }))

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

//info
app.get('/info', async (req, res) => {
  res.render('info', {
    argv1: inspect(process.argv[2]),
    argv2: inspect(process.argv[3]),
    platfName: inspect(process.platform),
    verNode: inspect(process.version),
    memUse: inspect(process.memoryUsage()),
    pathExec: inspect(process.cwd()),
    procId: inspect(process.pid),
    currentDir: inspect(process.argv[0]),
    numProcess: numCPUs
  });
})

//randoms
/*app.get('/randoms', async (req, res) => {
    let quantity=100000000;
    if (req.query.cant) {
      quantity = req.query.cant;
    }
    const child = fork('../backend/src/child.js', [quantity]);
    console.log(child);
    res.render('randoms', {cant: quantity});

    // child.on('exit', function() {
    //   res.render('randoms', {cant: 352});
    // })
})*/


/*app.get('/rnd', (req, res) => {
  if (req.isAuthenticated()) {
      req.user.counter = req.user.counter = 0 || req.user.counter++;
      const cant = Number(req.query.cant) || config.random_numbers;
      const forked = fork('./helper/random.js');
      forked.on('message', numbers => {
          res.json(numbers);
      })
      forked.send(cant);
  }
});*/

app.get('/randoms', (req, res) => {
  const quantity= Number(req.query.cant) || maxQtyRandom;
  /*if (req.query.cant)
    quantity = req.query.cant;*/
  
  const forked = fork('./src/child.js');//, [quantity]);
  //forked.send(quantity);
  console.log('inicio');
  
  setTimeout(() => {
         forked.send(quantity);
     }, 100);



  forked.on('message', ({quantity, numbers})=>{
    //console.log(`child_process exited with code ${code}`);
    console.log('message from child');
    console.log(numbers);
    res.render('randoms', {quantity: quantity, numbers: numbers});
  });

});


/* --------- LOGOUT ---------- */
app.get('/logout', async (req, res) => {
  let lastUser = req.user;
  req.logout();
  res.render('logout', {user: lastUser});
})


//socket connection
io.on('connection', socket => {
  console.log('Nuevo cliente conectado!')
  socket.emit('messages', messages)


  //When click insert from user
  socket.on('boton', async function(newProduct) { 
    console.log('Click del usuario');
    //const prod = products.add(newProduct);
    //console.log(newProduct);

    await productsDB.add(newProduct); 
    let valid =  await productsDB.read();
    console.log(valid);

    io.sockets.emit('productsToClient', newProduct);
  })

  //When chat send message
  socket.on('messages', async function(data) { 

    messages.push(data);
   
    console.log(data)
    await messageDB.add(data); 
    let valid =  await messageDB.read();
    console.log(valid);
 
    io.sockets.emit('messages', messages)
  })

})



/*
const server = httpServer.listen(PORT, ()=>{
  console.log(`HTTP Server listening on port: ${server.address().port}`)
  if (inspect(process.argv[2]))
    FACEBOOK_CLIENT_ID = inspect(process.argv[2]);
  if (inspect(process.argv[3]))
    FACEBOOK_CLIENT_SECRET = inspect(process.argv[3]);
})

server.on('error', error => {
  console.log(error.message)
})*/

//Process
process.on('exit', (code)=>{
  console.log('About to exit with code: ', code);
})


/**
 * Parámetros de entrada
 */
let START_MODE = 'FORK';

if (inspect(process.argv[4]))
{  
  let arg4 = inspect(process.argv[4]);
  console.log('Parámetros 4: ',inspect(process.argv[4]));
  console.log(arg4);
  if (arg4 === "'CLUSTER'")
  {
    console.log('es cluster');
    START_MODE = 'CLUSTER';
  }
  console.log(START_MODE);
  
}

switch(START_MODE) {
  case ('CLUSTER'):
    console.log('MODO CLUSTER');
    /* --------------------------------------------------------------------------- */
    /* MASTER */
    if (cluster.isMaster) {
      console.log(numCPUs)
      console.log(`PID MASTER ${process.pid}`)
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
      }
      cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
      })
    }
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
    else {
      app.listen(PORT, err => {
        if (!err){
          console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
          if (inspect(process.argv[2]))
            FACEBOOK_CLIENT_ID = inspect(process.argv[2]);
          if (inspect(process.argv[3]))
            FACEBOOK_CLIENT_SECRET = inspect(process.argv[3]);
        }
      })
    }

  break;

  default: //FORK
    //Server connection start
    console.log('MODO FORK');
    app.listen(PORT, err => {
      if (!err){
        console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
        if (inspect(process.argv[2]))
          FACEBOOK_CLIENT_ID = inspect(process.argv[2]);
        if (inspect(process.argv[3]))
          FACEBOOK_CLIENT_SECRET = inspect(process.argv[3]);
      }
    })
  break;
}
