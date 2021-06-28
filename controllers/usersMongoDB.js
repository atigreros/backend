import mongoose from 'mongoose'

let UsersSquema = new mongoose.Schema({
        username: {type: String, require:true, max: 60},
        password: {type: String, require:true, max: 60},
});

const usersDAO = mongoose.model('users', UsersSquema);

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
        console.log('Users Data base connected MONGOOSE: ' + connectionLabel);
    }
    catch(err){
        console.log(err);
    }
}

export default class UsersDB{
  constructor(connectionString, connectionLabel) {
    CRUD(connectionString, connectionLabel);
  }

  async add(data)
  {
      try{
          console.log("Add Users Mongoose");
          console.log(data);
          const newUsers = {
            username: data.username,
            password: data.password,
          };

          let usersSaveModel = await new usersDAO(newUsers);
          let usersSave = usersSaveModel.save();
          console.log('user adicionado en Mongo: ' + JSON.stringify(usersSave));
      } catch (err) {
          console.log(`Error en proceso de base de datos - Add: ${err}`)
      } finally {
          //await mongoose.disconnect()
      }

  }

  async read()
  {
      console.log("Read users from Mongoose");
      let users = await usersDAO.find({});
      console.log('user leido desde Mongo: ' + users);
      return users;
  }

  async readOne(username)
  {
      console.log("ReadOne users from Mongoose");
      let user = await usersDAO.findOne({ username: username});
      console.log('user  leido desde Mongo: ' + user);
      return user;
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