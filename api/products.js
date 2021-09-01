import config from '../config.js';
import ProductsFactoryDAO from '../model/DAOs/productsFactory.js'
import Products from '../model/models/products.js';

class ApiProducts {

    constructor() {
        this.productsDAO = ProductsFactoryDAO.get(config.PERSISTENCE)
    }

    async getProducts(id) { return await this.productsDAO.getProducts(id) }

    async addProduct(product) { 
        ApiProducts.validProduct(product,true)
        return await this.productsDAO.addProduct(product) 
    }

    async updateProduct(id,product) { 
        ApiProducts.validProduct(product,false)
        return await this.productsDAO.updateProduct(id,product) 
    }
    
    async deleteProduct(id) { return await this.productsDAO.deleteProduct(id) }

    static validProduct(product,requerido) {
        try {
            Products.validar(product,requerido)
        } catch (error) {
            throw new Error('invalid json format for this product or there arent enought data: ' + error.details[0].message)
        }
    }    
}

export default ApiProducts
