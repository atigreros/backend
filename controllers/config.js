const mysql = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'coderhouse',
    password: 'coderhouse',
    database: 'project'
  }
}
const sqlite3 = {
  client: 'sqlite3',
  connection: { filename: '../db.sqlite3' },
  useNullAsDefault: true
}

export { mysql, sqlite3 }