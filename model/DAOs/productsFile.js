import fs  from 'fs'
import productDTO from '../DTOs/products.js'
import ProductsBaseDAO from './products.js'

class ProductsFileDAO extends ProductsBaseDAO {

    constructor(fileName) {
        super()
        this.fileName = fileName
    }

    async read(file) {
        return JSON.parse(await fs.promises.readFile(file,'utf-8'))
    }

    async save(file,products) {
        await fs.promises.writeFile(file, JSON.stringify(products,null,'\t') )
    }

    getProducts = async _id => {
        try {
            if(_id) {
                let products = await this.leer(this.fileName)
                let index = products.findIndex(product => product._id == _id)

                return index>=0? [products[index]] : []
            }
            else {
                let products = await this.leer(this.fileName)
                return products
            }
        }
        catch(error) {
            console.log('Error getting product', error)
            let products = []

            //guardo archivo
            await this.save(this.fileName,products)
            return products
        }
    }

    addProduct = async product => {
        try {
            //leo archivo
            let products = await this.leer(this.fileName)

            let _id = this.getNext_Id(products)
            let fyh = new Date().toLocaleString()
            let savedProduct = productDTO(product,_id,fyh)
            products.push(savedProduct)

            //guardo archivo
            await this.save(this.fileName,products)

            return savedProduct
        }
        catch(error) {
            console.log('Error adding product', error)
            let product = {}

            return product
        }
    }

    updateProduct = async (_id,product) => {
        try {
            //leo archivo
            let products = await this.leer(this.fileName)

            let fyh = new Date().toLocaleString()
            let newProduct = productDTO(product,_id,fyh)

            let index = this.getIndex(_id,products)
            let currentProduct = products[index] || {}

            let updatedProduct = {...currentProduct,...newProduct}

            indice>=0? 
                products.splice(indice,1,updatedProduct) :
                products.push(updatedProduct)

            //guardo archivo
            await this.save(this.fileName,products)

            return updatedProduct
        }
        catch(error) {
            console.log('Error updating Product', error)
            let product = {}

            return product
        }

    }

    deleteProduct = async _id => {
        try {
            //leo archivo
            let products = await this.leer(this.fileName)

            let indice = this.getIndex(_id,products)
            let product = products.splice(indice,1)[0]

            //guardo archivo
            await this.guardar(this.fileName,products)

            return product
        }
        catch(error) {
            console.log('Error deleting product', error)
            let product = {}

            return product
        }
    }
}

export default ProductsFileDAO