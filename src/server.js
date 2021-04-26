import express from 'express'
import { createProductsRouter } from '../routers/productsRouter.js'



const app = express();
const PORT = 8080;


//indicates that we will use pug
app.set('views', './views');
app.set('view engine', 'pug');


app.use('/', createProductsRouter())


app.get('/', (req,res) => {
  res.render('guardar')
})


const server = app.listen(PORT, ()=>{
  console.log(`HTTP Server listening on port: ${server.address().port}`)
})

server.on('error', error => {
  console.log(error.message)
})