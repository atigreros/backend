import knex from 'knex'

class MessageDB {
  constructor(config) {
    this.knex = knex(config)
  }

  async create() {
    return this.knex.schema.dropTableIfExists('messages')
      .then(() => {
        return this.knex.schema.createTable('messages', table => {
          table.increments('id').primary();
          table.string('email', 64).notNullable();
          table.string('text', 128).notNullable();
          table.string('date', 15).notNullable();
        })
      })
  }

  add(message) {
    message.date = getDate();
    console.log(message);
    return this.knex('messages').insert([
      { email: message.email },
      { text: message.text },
      { date: message.date }
    ])
  }

  select() {
    return this.knex('messages').select()
  }

  delete(id) {
    return this.knex.from('messages').where('id', id).del()
  }

  update(id, newMessage) {
    return this.knex.from('messages').where('id', id).update({ text: newMessage })
  }

  close() {
    return this.knex.destroy()
  }
}

//return current Date
function getDate(){
  const d= new Date();
  return d.toLocaleString();
}

export default MessageDB