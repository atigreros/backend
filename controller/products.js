import ApiProducts from '../api/products.js'

class ControllerProducts {

    constructor() {
        this.apiProducts = new ApiProducts()
    }

    getProducts = async ({_id}) => {
        try {
            //let id = req.params.id
            let Products = await this.apiProducts.getProducts(_id)

            return(Products)
        }
        catch(error) {
            console.log('error getting products', error)
        }
    }

    addProduct = async ({title, price, stock, thumbnail}) => {
        try {
            let Product = {title, price, stock, thumbnail}
            console.log(Product)
            let productSaved = await this.apiProducts.addProduct(Product)

            return(productSaved)
        }
        catch(error) {
            console.log('error adding products', error)
        }
    }

    updateProduct = async ({_id, thumbnail}) => {
        try {
            //let Product = req.body
            //let id = req.params.id
            let productUpdated = await this.apiProducts.updateProduct(_id,{thumbnail})
            return(productUpdated)
        }
        catch(error) {
            console.log('error updating products', error)
        }
    }

    deleteProduct = async ({_id}) => {
        try {
            //let id = req.params.id
            let deletedProduct = await this.apiProducts.deleteProduct(_id)
            return(deletedProduct)
        }
        catch(error) {
            console.log('error deleting product', error)
        }
    }
}

export default ControllerProducts
