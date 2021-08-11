//import mongoose from 'mongoose'
const mongoose = require('mongoose')

let productSquema = new mongoose.Schema({
    title: {type: String, require:true, max: 60},
    price: {type: Number, require:true},
    thumbnail: {type: String, require:true, max: 200}
});

const product = mongoose.model('products', productSchema)

module.exports = {
    product
}

/*
const productsDAO = mongoose.model('products', ProductsSquema);

async function CRUD(connectionString, connectionLabel) {
    try{
        //database connection
        //const URL = 'mongodb://localhost/ecommerce';
        //const URL = 'mongodb+srv://ecommercedbUser:dbpass2021**@cluster0.ixflv.mongodb.net/ecommerce?retryWrites=true&w=majority';    
        const URL = connectionString;
        let path = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Data base connected MONGOOSE: ' + connectionLabel);
    }
    catch(err){
        console.log(err);
    }
}

export default class ProductsDB{
  constructor(connectionString, connectionLabel) {
    CRUD(connectionString, connectionLabel);
  }

  async add(data)
  {
      try{
          console.log("Add Products Mongoose");
          const newProduct = {
              title: data.title,
              price: data.price,
              thumbnail: data.thumbnail
          };

          let productSaveModel = await new productsDAO(newProduct);
          let productSave = productSaveModel.save();
          console.log('producto adicionado en Mongo: ' + productSave);
      } catch (err) {
          console.log(`Error en proceso de base de datos - Add: ${err}`)
      } finally {
          //await mongoose.disconnect()
      }

  }

  async read()
  {
      console.log("Read Mongoose");
      let products = await productsDAO.find({});
      console.log(products);
      return products;
  }
}    */
