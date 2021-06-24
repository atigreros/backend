import express from 'express'
import { createProductsRouter } from '../routers/productsRouter.js'
import {Server as HttpServer} from 'http'
import { Server as IOServer } from 'socket.io'
import Products from '../controllers/products.js'
//import File from '../controllers/FileSystem.js'; //persistence with fileSystem
//import MessageDB from '../controllers/messageDb.js'
import MessageMongoDB from '../controllers/messagesMongoDb.js'
import ProductsDB from '../controllers/productsDB.js'
import ProductsMongoDB from '../controllers/productsMongoDb.js'
import { 
  mongodbRemote as configmongodbRemote, 
  mongodbLocal as configmongodbLocal,
  mysql as configMysql,  
  //sqlite3 as configSqlite3 
} from '../controllers/config.js'
import ProductsFirebase from '../controllers/productsFirebase.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'


let productsDB;
let messageDB = new MessageMongoDB(configmongodbLocal.connectionString, configmongodbLocal.connectionLabel);
const persistence = 5;
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

//constans definitions
const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const messages = []
const advacedOptions = {userNewUrlParser: true, useUnifiedTopology: true}

app.use(cookieParser());

app.use((req, res, next) => {
  console.dir(req.cookies)
  console.dir(req.signedCookies)
  next()
})

//session setup
app.use(session({
  //**************Redis database*********
  store: MongoStore.create({mongoUrl: configmongodbRemote.connectionString}),
  ttl:300,
  mongoOptions: advacedOptions,
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 60000
  }

}));

//indicates that we will use ejs
app.set('view engine', 'ejs');

app.set("views", "./views");
app.use(express.static('public'));

//express rendering
app.use('/', createProductsRouter())


/*app.get('/', (req, res, next) => {
  req.session.user = req.body.user;
  res.cookie('usuario', req.body.user, {maxAge: 30000});
  res.render('login');
})*/

//REGISTER
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const {name, pwd} = req.body
  const user = users.find(user => user.name == name)
  if (user) {
      return res.render('error',{});
  } 
  user.push({name, pwd});
  res.redirect('/');
})

//LOGIN
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const {name, pwd} = req.body

  const user = users.find(user => user.name == name && user.pwd == pwd)
  if (!user) {
      return res.render('error',{});
  } 
  req.session.user = name;
  req.session.counter = 0;
  res.render('guardarSocket', {products: prod, user: name});

  /*if (req.body.user) {
      const prod = await productsDB.read();
      req.session.user = req.body.user;
      res.render('guardarSocket', {products: prod, user: req.session.user});
  } else {
      res.render('login');
  }*/
})

app.get('/logout', async (req, res) => {
  if (req.session.user) {
    res.render('logout', {user: req.session.user});
    req.session.destroy();  
  }
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

//Server connection start
const server = httpServer.listen(PORT, ()=>{
  console.log(`HTTP Server listening on port: ${server.address().port}`)
})

server.on('error', error => {
  console.log(error.message)
})

