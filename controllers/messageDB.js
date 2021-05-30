import { sqlite3 } from './config.js'
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

export default MessageDB