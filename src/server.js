import express from 'express'
import { createProductsRouter } from '../routers/productsRouter.js'
import {Server as HttpServer} from 'http'
import { Server as IOServer } from 'socket.io'
import Products from '../controllers/products.js'
//import File from '../controllers/FileSystem.js'; //persistence with fileSystem
import MessageDB from '../controllers/messageDb.js'
import { sqlite3 as configSqlite3 } from '../controllers/config.js'
import ProductsDB from '../controllers/productsDb.js'
import { mysql as configMysql } from '../controllers/config.js'


let products = new Products();
let messageDB = new MessageDB(configSqlite3);
let productsDB = new ProductsDB(configMysql);
//const file = new File('./../chat.txt');

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


app.get('/', (req,res) => {
  //res.render('guardarSocket')
  console.log('Render en el get');
  const prod = products.get();
  res.render('guardarSocket', {products: prod});
})

//socket connection
io.on('connection', socket => {
  console.log('Nuevo cliente conectado!')
  socket.emit('messages', messages)


  //When click insert from user
  socket.on('boton', async function(newProduct) { 
    console.log('Click del usuario');
    const prod = products.add(newProduct);
    console.log(newProduct);

    console.log(newProduct)
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

