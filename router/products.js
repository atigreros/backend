import express from 'express'
const router = express.Router()

import ControllerProducts from '../controller/products.js'

class RouterProducts {

    constructor() {
        this.controllerProducts = new ControllerProducts()
    }

    start() {
        router.get('/:id?', this.controllerProducts.getProducts)
        router.post('/', this.controllerProducts.addProduct)
        router.put('/:id', this.controllerProducts.updateProduct)
        router.delete('/:id', this.controllerProducts.deleteProduct)

        return router
    }
}

export default RouterProducts