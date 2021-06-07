const mysql = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'aleja78*',   
    database: 'prueba'
  }
}
const sqlite3 = {
  client: 'sqlite3',
  connection: { filename: './db.sqlite3' },
  useNullAsDefault: true
}

const mongodbLocal = {
  connectionString : 'mongodb://localhost/ecommerce', 
  connectionLabel : 'local'
}

const mongodbRemote = {
  connectionString : 'mongodb+srv://ecommercedbUser:dbpass2021**@cluster0.ixflv.mongodb.net/ecommerce?retryWrites=true&w=majority',
  connectionLabel : 'Atlas'
}

export { mysql, sqlite3, mongodbLocal, mongodbRemote }