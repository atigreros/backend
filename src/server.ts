
import express from 'express'
import { createProductsRouter } from '../routers/productsRouter.js'
import {Server as HttpServer} from 'http'
import { Server as IOServer } from 'socket.io'
import Products from '../controllers/products.js'

const products = new Products();

//constans definitions
const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const messages: string[] = []

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
  socket.on('boton', newProduct => {
    console.log('Click del usuario');
    const prod = products.add(newProduct);
    console.log(newProduct);
    io.sockets.emit('productsToClient', newProduct);
  })

  //When chat send message
  socket.on('messages', data => {
    messages.push(data)
    io.sockets.emit('messages', messages)
  })

})

//Server connection start
const server = httpServer.listen(PORT, ()=>{
  console.log(`HTTP Server listening on port: ${PORT}`)
})

server.on('error', error => {
  console.log(error.message)
})

