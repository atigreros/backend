import express from 'express'
import path from 'path'
//import Products from '../controllers/products.js'
import { createProductsRouter } from '../routers/productsRouter.js'

const app = express();
const PORT = 8080;
//const products = new Products();
//app.use(express.json())

app.use('/api/productos/', createProductsRouter())
//app.use(express.static("public"));

const server = app.listen(PORT, ()=>{
    console.log(`HTTP Server listening on port: ${server.address().port}`)
})

app.get('/api/productos/', function(req,res){
    res.sendFile(path.resolve() + '/src/index.html')
})

server.on('error', error => {
    console.log(error.message)
})
