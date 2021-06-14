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
import {normalize, denormalize, schema } from "normalizr";
import utils from "util";


let productsDB;
let messageDB = new MessageMongoDB(configmongodbLocal.connectionString, configmongodbLocal.connectionLabel);
const persistence = 5;


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

//indicates that we will use ejs
app.set('view engine', 'ejs');

app.set("views", "./views");
app.use(express.static('public'));

//express rendering
app.use('/', createProductsRouter())


app.get('/', async (req,res) => {
  //res.render('guardarSocket')
  const prod = await productsDB.read();
  console.log('Render en el get');
  //const prod = productsDB.read();
  res.render('guardarSocket', {products: prod});
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
    //console.log(valid);
 
    console.log("/* -------------- ORIGINAL ------------- */");
    console.log(utils.inspect(valid, false, 4, true));
    console.log("length", JSON.stringify(valid).length);
    
    // Define a author schema
    const authorSchema = new schema.Entity("author", {}, { idAttribute: 'id' });
    //const authorSchema = new schema.Entity("author");
    
    // Define your comments schema
    const textsSchema = new schema.Entity("text", {author: authorSchema});
    
    // Define your article
    const chatSchema = new schema.Array(textsSchema);
   // }, {idAttribute:'id'});
    
    const normalizedData = normalize(valid, chatSchema);
    console.log("/* -------------- NORMALIZED ------------- */");
    console.log(utils.inspect(normalizedData, false, 4, true));
    console.log("length", JSON.stringify(normalizedData).length);

    // const denormalizedData = denormalize(
    //   normalizedData.result,
    //   chatSchema,
    //   normalizedData.entities
    // );

    // console.log("/* -------------- DENORMALIZED ------------- */");
    // console.log(utils.inspect(denormalizedData, false, 4, true));
    // console.log("length", JSON.stringify(denormalizedData).length);


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

