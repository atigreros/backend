import express from 'express'
import path from 'path'
import exphbs from 'express-handlebars'
//import Products from '../controllers/products.js'
import { createProductsRouter } from '../routers/productsRouter.js'
//import productController from '../controllers/products.js';
// import './custom-theme.scss' //or whatever you called your Sass file

//const https = require('https');
//import https from 'https';


const app = express();
const PORT = 8080;
//const products = new Products();
//app.use(express.json())


const hbs = exphbs.create({
    extname: "hbs",
    helpers: {
      uppercase: function(s) {return s.toUpperCase();},
      bar: function() {return 'BAR!';}
    }
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//app.use('/api/productos/', createProductsRouter())
app.use('/', createProductsRouter())
//app.use(express.static("public"));


app.get('/', function(req,res){
  res.render('guardar')
})


/*app.get('/api/productos/', function(req,res){
  res.render('listar',products)
})*/

/*
app.get('/productos/vista', function (req, res) {

    res.render('productos',{
      person: {
        firstName: "Alejandra",
        lastName: "Tigreros",
      },
      products: [
            {
                "title": "abc",
                "price": "12",
                "thumbnail": "http://elunomasgrande",
                "id": 1
            },
            {
                "title": "otro prodcuto",
                "price": "35433",
                "thumbnail": "otraimagen",
                "id": 2
            }        
      ]
    });
  
  });


  /*app.get('/andres', function (req, res) {

  console.log('andres');

  https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });


  res.render('productos',{
    person: {
      firstName: "Andres",
      lastName: "Farfan",
    },


    products: [
          {
              "title": "abc",
              "price": "12",
              "thumbnail": "http://elunomasgrande",
              "id": 1
          },
        ]
      });
    
})*/

const server = app.listen(PORT, ()=>{
  console.log(`HTTP Server listening on port: ${server.address().port}`)
})

server.on('error', error => {
  console.log(error.message)
})