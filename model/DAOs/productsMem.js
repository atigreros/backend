import productDTO from '../DTOs/products.js'
import ProductsBaseDAO from './products.js'

class ProductsMemFileDAO extends ProductsBaseDAO {

    constructor() {
        super()
        this.products = []
    }

    getProducts = async _id => {
        try {
            if(_id) {
                let index = this.products.findIndex(product => product._id == _id)
                return index>=0? [this.products[index]] : []
            }
            else {
                return this.products
            }
        }
        catch(error) {
            console.log('Error getting product', error)
            return []
        }
    }

    addProduct = async product => {
        try {
            let _id = this.getNext_Id(this.products)
            let fyh = new Date().toLocaleString()
            let savedProduct = productDTO(product,_id,fyh)
            this.products.push(savedProduct)

            return savedProduct
        }
        catch(error) {
            console.log('Error adding product', error)
            let product = {}

            return product
        }
    }

    updateProduct = async (_id,noticia) => {
        try {
            let fyh = new Date().toLocaleString()
            let newProduct = productDTO(noticia,_id,fyh)

            let indice = this.getIndex(_id,this.products)
            let currentProduct = this.products[indice] || {}

            let updatedProduct = {...currentProduct,...newProduct}

            indice>=0? 
                this.products.splice(indice,1,updatedProduct) :
                this.products.push(updatedProduct)

            return updatedProduct
        }
        catch(error) {
            console.log('Error updating Product', error)
            let noticia = {}

            return noticia
        }
    }

    deleteProduct = async _id => {
        try {
            let indice = this.getIndex(_id,this.products)
            let product = this.products.splice(indice,1)[0]

            return product
        }
        catch(error) {
            console.log('Error deleting product', error)
            let product = {}

            return product
        }
    }
}

export default ProductsMemFileDAO