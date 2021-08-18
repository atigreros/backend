/* eslint-disable no-unused-vars */
import CustomError from '../errors/CustomError.js'

class ProductsDao {

    async getAll() {
        throw new CustomError(500, 'falta implementar getAll!')
    }

    async getById(id) {
        throw new CustomError(500, 'falta implementar getById!')
    }

    async add(prodNew) {
        throw new CustomError(500, 'falta implementar add!')
    }

    async deleteById(id) {
        throw new CustomError(500, 'falta implementar deleteById!')
    }

    async deleteAll() {
        throw new CustomError(500, 'falta implementar deleteAll!')
    }

    async updateById(id, newProd) {
        throw new CustomError(500, 'falta implementar updateById!')
    }
}

export default ProductsDao