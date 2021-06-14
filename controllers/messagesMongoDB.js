import mongoose from 'mongoose'

let MessagesSquema = new mongoose.Schema({
    author:{
        id: {type: String, require:true, max: 60}, //user email
        name: {type: String, require:true, max: 60},
        lastName: {type: String, require:true, max: 60},
        age: {type: Number, require:true},
        nickName: {type: String, require:true, max: 60},
        avatar: {type: String, require:true, max: 200}
    },
    text: {type: String, require:true, max: 60}
});

const messagesDAO = mongoose.model('messages', MessagesSquema);

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
        console.log('Message Data base connected MONGOOSE: ' + connectionLabel);
    }
    catch(err){
        console.log(err);
    }
}

export default class MessagesDB{
  constructor(connectionString, connectionLabel) {
    CRUD(connectionString, connectionLabel);
  }

  async add(data)
  {
      try{
          console.log("Add Messages Mongoose");
          const newMessages = {
            author:{
                id: data.email,
                name: data.name,
                lastName: data.lastName,
                age: data.age,
                nickName: data.nickName,
                avatar: data.avatar
            },
            text: data.text
          };

          let messagesSaveModel = await new messagesDAO(newMessages);
          let messagesSave = messagesSaveModel.save();
          console.log('mensaje adicionado en Mongo: ' + JSON.stringify(messagesSave));
      } catch (err) {
          console.log(`Error en proceso de base de datos - Add: ${err}`)
      } finally {
          //await mongoose.disconnect()
      }

  }

  async read()
  {
      console.log("Read Message from Mongoose");
      let messages = await messagesDAO.find({});
      console.log('mensaje leido desde Mongo: ' + messages);
      return messages;
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