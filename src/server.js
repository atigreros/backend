import express from 'express';
import { createProductsRouter } from '../routers/productsRouter.js';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import Products from '../controllers/products.js';
var products = new Products();
//constans definitions
var PORT = 8080;
var app = express();
var httpServer = new HttpServer(app);
var io = new IOServer(httpServer);
var messages = [];
//indicates that we will use ejs
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static('public'));
//express rendering
app.use('/', createProductsRouter());
app.get('/', function (req, res) {
    //res.render('guardarSocket')
    console.log('Render en el get');
    var prod = products.get();
    res.render('guardarSocket', { products: prod });
});
//socket connection
io.on('connection', function (socket) {
    console.log('Nuevo cliente conectado!');
    socket.emit('messages', messages);
    //When click insert from user
    socket.on('boton', function (newProduct) {
        console.log('Click del usuario');
        var prod = products.add(newProduct);
        console.log(newProduct);
        io.sockets.emit('productsToClient', newProduct);
    });
    //When chat send message
    socket.on('messages', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});
//Server connection start
var server = httpServer.listen(PORT, function () {
    console.log("HTTP Server listening on port: " + PORT);
});
server.on('error', function (error) {
    console.log(error.message);
});
