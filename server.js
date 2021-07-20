import express from 'express'
import {Server as HttpServer} from 'http'
import { Server as IOServer } from 'socket.io'
import Products from './controllers/products.js'
import {logger as logger} from './src/logger.js'

import MessageMongoDB from './controllers/messagesMongoDB.js'
import ProductsDB from './controllers/productsDB.js'
import ProductsMongoDB from './controllers/productsMongoDB.js'
import { 
  mongodbRemote as configmongodbRemote, 
  mongodbLocal as configmongodbLocal,
  mysql as configMysql,
  maxQuantityRandom as maxQtyRandom
} from './controllers/config.js'
import UserMongoDB from './controllers/usersMongoDB.js'
import ProductsFirebase from './controllers/productsFirebase.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'

//**************PASSPORT*****************
import passport from 'passport'
import facebookStrategy from 'passport-facebook'

//**************PROCESS*****************
import { inspect } from 'util'
import { fork } from 'child_process'
import cluster from 'cluster'
import CPUs from 'os'
import compression  from  'compression'

//**************VARIABLES*****************
let productsDB;
//let messageDB = new MessageMongoDB(configmongodbLocal.connectionString, configmongodbLocal.connectionLabel);
//let UserDB = new UserMongoDB(configmongodbLocal.connectionString, configmongodbLocal.connectionLabel);

//**************CONSTANTS*****************
//const PORT = 8081;
const PORT = parseInt(process.argv[2]) || 8080;
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const messages = []
const advacedOptions = {userNewUrlParser: true, useUnifiedTopology: true}
const persistence = 6;
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
    logger.info('Facebook User Profile %s', userProfile)
    //console.log(userProfile)
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

//Se comenta esta linea, pues será nginx quien se encargará de ofrecer los recursos estáticos
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
  logger.info("Passing by get /")
  //console.log("get /");
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

app.get('/datos', (req,res) =>  {
  logger.info('Data information port: %s, date(Fyh): %s', PORT, Date.now())
  //console.log('port:', PORT, 'Fyh:', Date.now());
  res.send(`Servidor express (NGINX) en ${PORT} <b>PID ${process.pid}<b> - ${new Date().toLocaleDateString()}`);
})

//info
app.get('/info', async (req, res) => {
  res.render('info', {
    argv2: inspect(process.argv[2]),
    argv3: inspect(process.argv[3]),
    argv4: inspect(process.argv[4]),
    argv5: inspect(process.argv[5]),
    argv6: inspect(process.argv[6]),
    platfName: inspect(process.platform),
    verNode: inspect(process.version),
    memUse: inspect(process.memoryUsage()),
    pathExec: inspect(process.cwd()),
    procId: inspect(process.pid),
    currentDir: inspect(process.argv[0]),
    numProcess: numCPUs
  });
})

//with compression
app.get('/infozip', compression(), async (req, res) => {
  res.render('info', {
    argv2: inspect(process.argv[2]),
    argv3: inspect(process.argv[3]),
    argv4: inspect(process.argv[4]),
    argv5: inspect(process.argv[5]),
    argv6: inspect(process.argv[6]),
    platfName: inspect(process.platform),
    verNode: inspect(process.version),
    memUse: inspect(process.memoryUsage()),
    pathExec: inspect(process.cwd()),
    procId: inspect(process.pid),
    currentDir: inspect(process.argv[0]),
    numProcess: numCPUs
  });
})


app.get('/randoms', (req, res) => {
  const quantity= Number(req.query.cant) || maxQtyRandom;
  const forked = fork('./src/child.js');//, [quantity]);

  logger.info('start Randoms');
  
  setTimeout(() => {
         forked.send(quantity);
     }, 100);

  forked.on('message', ({quantity, numbers})=>{
    //console.log(`child_process exited with code ${code}`);
    logger.warn('message from child %s', numbers);
    res.render('randoms', {quantity: quantity, numbers: numbers});
  });

});

//Heroku test
app.get('/mensaje',(req,res)=>{
  res.send('Hola Node.js desde Heroku')
})


/* --------- LOGOUT ---------- */
app.get('/logout', async (req, res) => {
  let lastUser = req.user;
  req.logout();
  res.render('logout', {user: lastUser});
})


//socket connection
io.on('connection', socket => {
  logger.warn('New user connected!')
  socket.emit('messages', messages)


  //When click insert from user
  socket.on('boton', async function(newProduct) { 
    logger.info('Click del usuario');
    //const prod = products.add(newProduct);
    //console.log(newProduct);

    await productsDB.add(newProduct); 
    let valid =  await productsDB.read();
    logger.info(valid);

    io.sockets.emit('productsToClient', newProduct);
  })

  //When chat send message
  socket.on('messages', async function(data) { 

    messages.push(data);
   
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


/**
 * Parámetros de entrada
 */
let START_MODE = 'FORK';

if (inspect(process.argv[3]))
{  

  let arg3 = inspect(process.argv[3]);
  logger.warn('Parámetro 2: %s',inspect(process.argv[2]));
  logger.warn('Parámetro 3: %s',inspect(process.argv[3]));
  logger.warn('Parámetro 4: %s',inspect(process.argv[4]));

  if (arg3 === "'CLUSTER'" || arg3 === "CLUSTER")
  {
    logger.info('It is Cluster');
    START_MODE = 'CLUSTER';
  }
  logger.info('Start Mode %s',START_MODE);
  
}

switch(START_MODE) {
  case ('CLUSTER'):
    logger.info('MODO CLUSTER');
    /* --------------------------------------------------------------------------- */
    /* MASTER */
    if (cluster.isMaster) {
      logger.info('numero de núcleos: %s',numCPUs)
      logger.info('PID MASTER: %s',process.pid)
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
      }
      cluster.on('exit', worker => {
        logger.info('Worker: %s, died: %s', worker.process.pid, new Date().toLocaleString())
        cluster.fork()
      })
    }
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
    else {
      app.listen(PORT, err => {
        if (!err){
          logger.info('Servidor express escuchando en el puerto: %s, PID WORKER: %s', PORT, process.pid)
          if (inspect(process.argv[4]))
            FACEBOOK_CLIENT_ID = inspect(process.argv[4]);
          if (inspect(process.argv[5]))
            FACEBOOK_CLIENT_SECRET = inspect(process.argv[5]);
        }
      })
    }

  break;

  default: //FORK
    //Server connection start
    logger.info('MODO FORK');
    app.listen(PORT, err => {
      if (!err){
        logger.info('Servidor express escuchando en el puerto: %s, PID WORKER: %s', PORT, process.pid)
        if (inspect(process.argv[4]))
          FACEBOOK_CLIENT_ID = inspect(process.argv[5]);
        if (inspect(process.argv[4]))
          FACEBOOK_CLIENT_SECRET = inspect(process.argv[5]);
      }
    })
  break;
}
