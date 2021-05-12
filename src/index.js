import express from 'express'
import path from 'path'
//import Products from '../controllers/products.js'
import { createProductsRouter } from '../routers/productsRouter.js'
import { createCarritoRouter } from '../routers/carritoRouter.js'

const app = express();
const PORT = 8080;
//const products = new Products();
//app.use(express.json())

app.use('/productos/', createProductsRouter())
app.use('/carrito/', createCarritoRouter())
//app.use(express.static("public"));

const server = app.listen(PORT, ()=>{
    console.log(`HTTP Server listening on port: ${server.address().port}`)
})

app.get('/api/productos/', function(req,res){
    res.sendFile(path.resolve() + '/public/index.html')
    //res.sendFile('/index.html')
})

server.on('error', error => {
    console.log(error.message)
})
