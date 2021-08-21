import express from 'express'
import handlebars from 'express-handlebars'
import argv from 'yargs'

import * as controller from './controller/products.js'

const port = argv(process.argv.slice(2)).argv.port;
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

/* ------------------------------------------------------------------------------ */
/*             Configuración del motor de plantillas handlebars                   */
/* ------------------------------------------------------------------------------ */
app.engine('hbs', handlebars({extname:'.hbs', defaultLayout: 'index.hbs'}) )
app.set('views', './views')
app.set('view engine', 'hbs')

/* -------------------------------------- */
/*             HTML ON WIRE               */
/* -------------------------------------- */
app.get('/html-onwire', controller.getHtmlOnwire)
app.post('/html-onwire', controller.postHtmlOnwire )

/* -------------------------------------- */
/*             DATA ON WIRE               */
/* -------------------------------------- */
app.get('/data-onwire', controller.getDataOnwire)
app.post('/data-onwire', controller.postDataOnwire)
app.get('/data-json', controller.dataJSON)

/* -------------------------------------- */
/*                SINGLETON               */
/* -------------------------------------- */
app.get('/datos', controller.getHour)

const PORT = port || 8080 //yargs
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))


