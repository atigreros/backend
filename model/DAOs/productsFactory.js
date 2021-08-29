import ProductsMemDAO from './productsMem.js'
import ProductsFileDAO from './productsFile.js'
import ProductsDBMongo from './productsDBMongo.js'

class ProductsFactoryDAO {
    static get(tipo) {
        switch(tipo) {
            case 'MEM': return new ProductsMemDAO()
            case 'FILE': return new ProductsFileDAO(process.cwd() + '/products.json')
            case 'MONGO': return new ProductsDBMongo('mibase','products')
            default: return new ProductsMemDAO
        }
    }
}

export default ProductsFactoryDAO