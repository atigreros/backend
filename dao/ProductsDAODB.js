import ProductsDao from './ProductsDAO.js'
import products from '../model/products.js'
import CustomError from '../errors/CustomError.js'
import MyMongoClient from '../db/DbClientMongo.js'
import Config from '../config.js'

class ProductsDaoDb extends ProductsDao {

    constructor(){
        super()
        this.client = new MyMongoClient()
        this.client.connect()
        this.projection = Config.db.projection
    }

    async getAll() {
        try {
            const searched = await products.find({}, this.projection ).lean()
            return searched
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los productos', err)
        }
    }

    async getById(idBuscado) {
        let searched
        try {
            searched = await products.findOne({ _id: idBuscado }, this.projection ).lean()
        } catch (err) {
            throw new CustomError(500, 'error al buscar producto por dni', err)
        }

        if (!searched) {
            throw new CustomError(404, 'producto no encontrado con ese ID', { id: idBuscado })
        }

        return searched
    }

    async add(prodNew) {
        let result
        try {
            const productAdd = new products(prodNew)
            result = await productAdd.save()
        } catch (error) {
            throw new CustomError(500, 'error al crear un nuevo producto', error)
        }
        return prodNew
    }

    async deleteById(idParaBorrar) {
        let result
        try {
            result = await products.deleteOne({ _id: idParaBorrar })
        } catch (error) {
            throw new CustomError(500, `error al borrar producto`, error)
        }

        if (result.deletedCount == 0) {
            throw new CustomError(404, `no existe un producto para borrar con id: ${idParaBorrar}`, { idParaBorrar })
        }
    }

    async deleteAll() {
        try {
            await products.deleteMany()
        } catch (error) {
            throw new CustomError(500, `error al borrar a todos los productos`, error)
        }
    }

    async updateById(idParaReemplazar, newProd) {
        let result
        try {
            result = await productos.findOneAndReplace({ _id: idParaReemplazar }, nuevoProd, this.projection )
        } catch (error) {
            throw new CustomError(500, `error al reemplazar al producto`, error)
        }

        if (!result) {
            throw new CustomError(404, `no se encontró para actualizar un producto con id: ${idParaReemplazar}`, { idParaReemplazar })
        }

        return newProd
    }
    exit() {
        this.client.disconnect()
    }
}

export default ProductsDaoDb