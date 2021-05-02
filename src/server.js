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
  console.log(prod);
  res.render('guardarSocket', {products: prod});
})

//socket connection
io.on('connection', socket => {
  console.log('Nuevo cliente conectado!')

  /* Envio los mensajes al cliente que se conectó */
  /*socket.emit('mensajes', mensajes)*/

  /* Escucho los mensajes enviado por el cliente y se los propago a todos */
  /*socket.on('mensaje', data => {
      mensajes.push({ socketid: socket.id, mensaje: data })
      io.sockets.emit('mensajes', mensajes);
  })*/

  /* Escucho el click del boton*/
  socket.on('boton', newProduct => {
    console.log('Click del usuario');
    //console.log('Datos recibidos:');
    //console.log(data);
    //console.log(products);

    const prod = products.add(newProduct);
    console.log(newProduct);
    io.sockets.emit('productsToClient', newProduct);
  })

})

//Server connection start
const server = httpServer.listen(PORT, ()=>{
  console.log(`HTTP Server listening on port: ${server.address().port}`)
})

server.on('error', error => {
  console.log(error.message)
})

