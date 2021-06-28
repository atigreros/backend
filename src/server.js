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
import UserMongoDB from '../controllers/usersMongoDb.js'
import ProductsFirebase from '../controllers/productsFirebase.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
//import bodyParser from 'body-parser'

//**************PASSPORT*****************
import bCrypt from 'bCrypt'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { config } from 'process'


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
//DATABASE
const users = [];
//const localStrategy = LocalStrategy.Strategy;



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


  /* ------------------ PASSPORT -------------------- */

  passport.use('register', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    //const { direccion } = req.body
    //users = UserDB.read();
    const usuario = await UserDB.readOne(username);
    //const usuario = users.find(usuario => usuario.username == username)
    console.log(usuario)
    if (usuario) {
      return done(null, false); //'already registered')
    }
  
    const user = {
      username,
      password,
      //direccion,
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
  
    if (user.password != password) {
      return done(null, false)
    }
  
    user.contador = 0
    console.log('login with user');
    console.log(user);
    return done(null, user);
  }));


/*const isValidPassword = function (user,password) {
  return bCrypt.compareSync(password, user.password)
}

passport.use('register', new LocalStrategy({
  passReqToCallback : true
  },
  function(req, username, password, done) {
    //Encontrar un usuario en Mongo con el username informado
    UserDB.findOne({'username':username}, 
    function (err,user) {
      //En caso de error, retornar usando el método done()
      if (err) {
        console.log('Error en el SignUp: ' + err);
        return done(err);
      }
      //Ya existe el usuario
      if (user) {
        console.log('Usuario ya existe');
        return done(null, false,
          console.log('message','El usuario ya existe'))
      } else {
        //Si no hay usuario con ese email, crearlo
        var newUser = new UserDB();
        newUser.username = username;
        newUser.password = createHash(password);
        //newUser.email = req.body.email;
        //newUser.firstName = req.body.firstName;

        //Guardar el usuario
        newUser.save(function(err) {
          if (err) {
            console.log('Error guardando el usuario: ' + err);
            throw err;
          }
          console.log('Registro de usuario exitoso');
          return done(null, newUser);
        });
      }
    })
  }
));


var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

//session setup
/*app.use(session({
  store: MongoStore.create({mongoUrl: configmongodbRemote.connectionString}),
  ttl:300,
  mongoOptions: advacedOptions,
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 60000
  }
}));*/

/*passport.use('login', new LocalStrategy({
    passReqToCallback : true},
    function(req, username, password, done) {
      //check in Mongo if username exist or not
      UserDB.findOne({'username': username},
        function(err,user) {
          //En caso de error, retornar usando el método done()
          if(err)
          return done(err);
          //El usuario no existe, log de eror y redireccionar atrás
          if(!user) {
            console.log('No se encontró usuario: '+ username);
            return done(null,false,
              console.log('message','Usuario no encontrado')
            );
          }
          //El usuario existe, pero password equivocado
          if(!isValidPassword(user,password)) {
            console.log('Password inválido');
            return done(null, false,
              console.log('message','Password inválido')
            );
          }
          //Usuario y password coinciden
          //return usuario desde el método done lo que será manejado como éxito
          return done(null, user);
        }
      );
    })
  );*/


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

app.use(cookieParser());

app.use(session({
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  }
}))


app.use(passport.initialize());
app.use(passport.session());

//indicates that we will use ejs
app.set('view engine', 'ejs');

app.set("views", "./views");
app.use(express.static('public'));

//express rendering
app.use('/', createProductsRouter())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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

// LOGIN
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/data' }))

app.get('/faillogin', (req, res) => {
  res.render('login-error', {});
})


// DATA
app.get('/data', isAuth, async (req, res) => {
  console.log('entré a data');
  console.log(req.user);

  if (req.user.contador == undefined || !req.user.contador) {
     req.user.contador = 0
  }

  req.user.contador++
  const prod = await productsDB.read();

  res.render('guardarSocket', {
    products: prod,
    user: req.user,
    contador: req.user.contador
  });
})


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

//Server connection start
const server = httpServer.listen(PORT, ()=>{
  console.log(`HTTP Server listening on port: ${server.address().port}`)
})

server.on('error', error => {
  console.log(error.message)
})

