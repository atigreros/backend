import mongoose from 'mongoose'

    let MessagesSquema = new mongoose.Schema({
        email: {type: String, require:true, max: 60},
        text: {type: String, require:true, max: 100},
        date: {type: String, require:true, max: 50}
    });

    const messagesDAO = mongoose.model('messages', MessagesSquema);

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

    export default class MessageDB{
        constructor() {
        }
    
        async add(data)
        {
            try{
                console.log("Add Mongoose");
                const newMessage = {
                    email: data.email,
                    text: data.text,
                    date: data.date
                };
    
                let messageSaveModel = await new messagesDAO(newMessage);
                let messageSave = messageSaveModel.save();
                console.log(messageSave);
            } catch (err) {
                console.log(`Error en proceso de base de datos - Add: ${err}`)
            } finally {
                //await mongoose.disconnect()
            }

        }

        async read()
        {
            console.log("Read Mongoose");
            let messages = await messagesDAO.find({});
            console.log(messages);
        }
    }


/*import { sqlite3 } from './config.js'
import knexLib from 'knex'

class MessageDB {
    constructor() {
        this.knex = knexLib(sqlite3);
        (async() => {
            let exists = await this.knex.schema.hasTable('messages')
            if (!exists) {
                await this.knex.schema.createTable('messages', table => {
                    table.increments('id').primary();
                    table.string('email', 60);
                    table.string('text', 100);
                    table.string('date',50);
                });
                console.log('table messages was created!')
            }
        })()
    }

    read() {
        return this.knex('messages').select('*')
    }
    
    add(message) {
        message.date = getDate();
        return this.knex('messages').insert(message) 
    }
}

//return current Date
function getDate(){
  const d= new Date();
  return d.toLocaleString();
}

export default MessageDB*/

