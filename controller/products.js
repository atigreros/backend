import ApiProducts from '../api/products.js'

class ControllerProducts {

    constructor() {
        this.apiProducts = new ApiProducts()
    }

    getProducts = async (req,res) => {
        try {
            let id = req.params.id
            let Products = await this.apiProducts.getProducts(id)

            res.send(Products)
        }
        catch(error) {
            console.log('error getting products', error)
        }
    }

    addProduct = async (req,res) => {
        try {
            let Product = req.body
            let productSaved = await this.apiProducts.addProduct(Product)

            res.json(productSaved)
        }
        catch(error) {
            console.log('error adding products', error)
        }
    }

    updateProduct = async (req,res) => {
        try {
            let Product = req.body
            let id = req.params.id
            let productUpdated = await this.apiProducts.updateProduct(id,Product)
            res.json(productUpdated)
        }
        catch(error) {
            console.log('error updating products', error)
        }
    }

    deleteProduct = async (req,res) => {
        try {
            let id = req.params.id
            let deletedProduct = await this.apiProducts.deleteProduct(id)
            res.json(deletedProduct)
        }
        catch(error) {
            console.log('error deleting product', error)
        }
    }
}

export default ControllerProducts
