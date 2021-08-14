const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const validaciones = require('./validaciones/products')
const model = require('./model/products')

/* ------------ INSTANCIA 1 DE SERVIDOR --------------- */
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* Middleware custom */
app.use((req, res, next) => {
    next()
})

/* ---------------------------------------------------- */
/*                   Ruta GET: params                   */
/* ---------------------------------------------------- */
app.get('/datos/:title?/:price?/:thumbnail?', (req, res) => {
    const { url, method } = req
    const { title, price, thumbnail } = req.params
    res.send(`<h3>Ruta: ${method} - url: ${url} - title: ${title} - price: ${price} - thumbnail: ${thumbnail}</h3>`)
})


/* ---------------------------------------------------- */
/* ---------------------------------------------------- */
/*                     API REST FULL                    */
/* ---------------------------------------------------- */
/* ---------------------------------------------------- */

/* ---------------------------------------------------- */
/*     Definición de rutas GET (Pedir información)      */
/* ---------------------------------------------------- */
router.get('/:id?', (req, res) => {
    const { id } = req.params

    const query = id ? { _id: id } : {}
    model.products.find(query, (err, products) => {
        if (err) throw new Error(`error en lectura de productos: ${err}`)
        // usuarios.forEach(usuario => {
        //     console.log(usuario)
        // })
        res.send(products)
    })
})
/* ---------------------------------------------------- */
/*     Definición de rutas POST  (Enviar información)   */
/* ---------------------------------------------------- */
router.post('/', (req, res) => {
    const product = req.body

    const val = validaciones.validar(product)
    if (val.result) {
        const productoNuevo = new model.products(product)
        productoNuevo.save(err => {
            if (err) throw new Error(`error en escritura de producto: ${err}`)
            // console.log('Usuario incorporado')
            //res.send({...usuario, nombre: 'Juan'}) //Para causar error de test en post
            res.send(product)
        })
    } else {
        res.send(val.error)
    }
})

/* ---------------------------------------------------- */
/*   Definición de rutas PUT (Actualizar información)   */
/* ---------------------------------------------------- */
router.put('/:id', async (req, res) => {
    const { id } = req.params

    const product = req.body

    const val = validaciones.validar(product)
    if (val.result) {
        const rta = await model.products.updateOne({ _id: id }, { $set: product })
        res.send(rta)
    } else {
        res.send(val.error)
    }
})

/* ---------------------------------------------------- */
/*   Definición de rutas DELETE (Eliminar información)  */
/* ---------------------------------------------------- */
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const rta = await model.products.deleteOne({ _id: id },)
    res.send(rta)
})
//----------------------------------------------------------------

app.use('/api', router)

module.exports = app
