import config from './config.js';
import express from 'express'
import cors from 'cors'
import RouterProducts from './router/products.js'

const app = express()

if(config.NODE_ENV == 'development') app.use(cors())

app.use(express.static('public'))
app.use(express.json())

const routerProducts = new RouterProducts()

/* ------------------------------------------------------------- */
/*              ZONE MANAGED BY ROUTER                           */
/* ------------------------------------------------------------- */
app.use('/products', routerProducts.start())

/* ------------------------------------------------------------- */
/*                      Servidor LISTEN                          */
/* ------------------------------------------------------------- */
const PORT = config.PORT || 8000
const server = app.listen(PORT, 
    () => console.log(
        `Express server listening port: ${PORT} (${config.NODE_ENV} - ${config.PERSISTENCE})`
))
server.on('error', error => console.log('Express server error:', error) )
