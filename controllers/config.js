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

export { mysql, sqlite3 }