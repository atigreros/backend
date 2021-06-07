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

const firebaseAccount = {
  "type": "service_account",
  "project_id": "ecommerce-4940a",
  "private_key_id": "9e041f183b0fcb1c07edee1fb13b31a465dfd318",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/ap3xpGdeOlMg\njyx3BQldeo83KCxPgm7RplQ3RzzFE65jKSzfT3ROfp0KpTvnui1BG2osvNjAR3yc\nFPhnaUIhiGstrjw7JEI88BMzDGg45EwfNjcFu4ZCUx3fsCF2D4nAYR1suOXqsM6/\nrATyfM/inKH0OX8LcbQ4ieH9l5AYYlXbHDpkGG3nCKKj3HLzMMuVD32Zlz8XwFiA\nIEDa11S3OQ+KMUhUYd3dp5kqZVlF6WoHokrngx56KgGWSmxNcyH5v/iqhdPxd6oE\nvuIx1AHLLu1zCnIjX66YZHsovforf1FiNCoUqFJF9PaUqWqn385GbjxiL02tdHQF\npcKSNVyJAgMBAAECggEABX4xFh7E+0aVMsP+X1P9AXpjjbj7ZzSzqr8pKi+Ye4H7\nE8wPW5Z+HJqJiyVUDhb2TCirPVQWAZPg7DcLLHyFcfeQ4SNfhcWemP0Sr/j/11Ib\nKnIggMDxiLRgkRYO1RfRDieQnpltD5+57x99QjAkDw62SbnfVBwT3eN8YWNDYU+0\nY708xpM5wLZpoKV1O74Srm9yIHA3zINdmmvWvFSAtZylCIJ0CvSSxznDfsgVJLTl\n9/q614d2JHMdhIb+Ez5D7MqTBVI6eyL80TIYQ9ZrkK6BKfDiDSBlONyGy5Qq5zWo\n0z/4GMNCDa7vz1z81tjpEv/EP92iQWE9O7eC115lAQKBgQDfk+tLXGRNW0AvibhJ\nJpaFSg5NaU6CgZTvXYa3M/shcVFYzjkLkfRFwjEJkMDp4AkHcQ4rdcQ9fl33AWCT\nEmU94N0CBr8mKGOBOMD+L5q6y+nw3UpW+MJzUpCLJRFBTJc1qLLsqyUeBLBnYwIO\nZWOz/Obc6OGn2iVf0J14Ym/bUQKBgQDbLL5W9kejgPYj6p+BkhLpY31BQ9a5lUj6\nitq4AEKDY039XEzrthffpN9eEXyyoCGKfRL3qVUzwgA50bxkfyjdmdy6N0DDBCMj\nmWlo33b5+8/C5jzLfQsUcWvOPeUC0who6wkttDH23zdJ0lm+SjuANaGcUzR+e/zH\nH2x9hVwvuQKBgBp0u3QIc8n/kUHOzyLA0TDmiXi5jFO/F6uXapiFKyNS8GhMxs1K\nsRgMGZdjLKDAJPFffGjCH72TFXVkEVR16cr/r8dMmxPd1aB14chyQ6H0/TLGTMSr\n3P6ed4IvmbIbaQ0tcDa3LcY2kdU6DwU7FCg5NexQFluxYZjL68ZSB6BxAoGAG/0F\nvXMryMxiIkoG3nP56EXlK91u4ToYHK54qcCWvdKDlhQgWoVhXRTf1VJkWycpwVah\ngnDkSXy/rKKE7UxzuoC4eCswIPc5SYWAuXy348ptSJVANDgenxiwzKCIyyiJzWQe\nQvDc5Iqys8Gh5jPyjzfKEH1rma9Zo0/2+bx6/jkCgYEAuD6UFIMwTMlrnMxPTuy4\nUD/3Bjx6ULGZldf4YiR9D5cOFg7GnbeUMPMTMZUFdljPdqT6dRXNGQSkDh6GrAUs\nn67D5KO/EXnBZDqLKoewWnXlZDDsP9q1ovj4hw+MbjP+6BY8d27wCaPl8xwq+0kr\nZ/RC9tVBEl0xe8XPYZrupW4=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-bjtjh@ecommerce-4940a.iam.gserviceaccount.com",
  "client_id": "111634944620525081711",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bjtjh%40ecommerce-4940a.iam.gserviceaccount.com"
}

export { mysql, sqlite3, mongodbLocal, mongodbRemote, firebaseAccount }