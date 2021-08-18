import ProductsDaoDB from './dao/productsDaoDB.js'
import DTO from './dto/products.js'

class ProductsApi {

    constructor() {
        this.productsDao = new ProductsDaoDB()
    }

    async get() {
        let products = await this.productsDao.getAll()
        return products
    }

    async add(prodParaAgregar) {
        const prodAgregado = await this.productsDao.add(prodParaAgregar)
        return prodAgregado
    }

    /*async search(id) {
        let products
        if (id) {
            products = await this.productsDao.getById(id)
        } else {
            products = await this.productsDao.getAll()
        }
        return products
    }

    async delete(id) {
        if(id) {
            await this.productsDao.deleteById(id)
        }
        else {
            await this.productsDao.deleteAll()
        }
    }

    async update(id, prodParaReemplazar) {
        const prodReemplazado = await this.productsDao.updateById(id, prodParaReemplazar)
        return prodReemplazado
    }*/
    async getByIdDto(id) {
        let product
        if (id) {
            product = await this.productsDao.getById(id)
            return DTO.productInfo(product)
        } 
        else {
            product = {}
        }
        return product
    }

    exit() {
        this.productsDao.exit()
    }

}

import minimist from 'minimist'

console.log('Instanciando la API')
const productsApi = new ProductsApi()

async function executeCmds() {
    const argv = minimist(process.argv.slice(2))
    const {cmd,id,title,price,thumbnail} = argv
    try {
        switch(cmd.toLowerCase()) {
            case 'get':
                console.log(cmd)
                console.log(await productsApi.get(id))
                break

            case 'add':
                console.log(cmd)
                console.log(await productsApi.add({title,price,thumbnail}))
                break

            /*case 'buscar':
                console.log(cmd)
                console.log(await productsApi.buscar(id))
                break

            case 'agregar':
                console.log(cmd)
                console.log(await productsApi.agregar({title,price,thumbnail}))
                break

                    
            case 'reemplazar':
                console.log(cmd)
                console.log(await productosApi.reemplazar(id,{title,price,thumbnail}))
                break
                            
            case 'borrar':
                console.log(cmd)
                await productsApi.borrar(id)
                break*/
            
            case 'getByIdDto':
                console.log(cmd)
                console.log(await productosApi.getByIdDto(id))
                break

            default:
                console.log('comando no válido:',cmd)
        }
    }
    catch(error) {
        console.log(error)
    }

    productsApi.exit()
}

executeCmds()