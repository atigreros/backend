import mongoose from 'mongoose'

let ProductsSquema = new mongoose.Schema({
    title: {type: String, require:true, max: 60},
    price: {type: Number, require:true},
    thumbnail: {type: String, require:true, max: 200}
});

const productsDAO = mongoose.model('products', ProductsSquema);

CRUD()

async function CRUD() {
    try{
        //database connection
        const URL = 'mongodb://localhost/ecommerce';
        let path = await mongoose.connect(URL, {
            userNewUrlParser: true,
            userUnifiedTopology: true
        })
        console.log('Data base connected MONGOOSE');
    }
    catch(err){
        console.log(err);
    }
}

export default class ProductsDB{
  constructor() {
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
          console.log(productSave);
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
  }
}    

    

/*import { mysql } from './config.js'
import knexLib from 'knex'

class ProductsDB {
    constructor() {
        this.knex = knexLib(mysql);
        (async() => {
            let exists = await this.knex.schema.hasTable('products')
            if (!exists) {
                await this.knex.schema.createTable('products', table => {
                    table.increments('id').primary();
                    table.string('title', 30);
                    table.float('price', 100);
                    table.string('thumbnail',200);
                    table.integer('stock');
                });
                console.log('Products table created!')
            }
        })()
    }

    read(id) {
        return id? 
            this.knex('products').select('*').where('id', id) :
            this.knex('products').select('*')
    }
    
    add(product) {
        return this.knex('products').insert(product) 
    }

    update(id, newStock) {
      return this.knex.from('products').where('id', id).update({ stock: newStock })
    }

    //update(producto, id) {
    //    return this.knex.from('products').where('id', id).update(product)
    //}
    
    delete(id) {
        return this.knex.from('products').where('id', id).del()
    }
}

export default ProductsDB*/