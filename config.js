// config.js
import dotenv from 'dotenv';
//import path from 'path';
//const dotenv = require('dotenv').config();
//const path = require('path')

//const dotenv = denv.config();

/*dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
})*/

if (process.env.NODE_ENV ==='development')
  dotenv.config({ path:'./development.env'})
else dotenv.config({ path:'./production.env'})

//module.exports
const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
//  HOST: process.env.HOST || '127.0.0.1',
  PERSISTENCE: process.env.PERSISTENCE
}

export default config