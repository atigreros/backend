import { ProductDTO } from "../dto/products.js"
import fs from 'fs'

class ProductFileDao {

    constructor(){
        this.archivo = null
    }

    async init(archivo) {
        this.archivo = archivo
        try {
            await fs.promises.readFile(this.archivo,'utf-8')
        }
        catch(error) {
            await fs.promises.writeFile(this.archivo, JSON.stringify([]))
        }
    }

    getNextId(products) {
        let lg = products.length
        return lg? products[lg-1].id + 1 : 1
    }
    getIndex(id,products) {
        return products.findIndex(product => product.id === id)
    }
    getFyH() {
        return new Date().toLocaleString()
    }

    async getAll() {
        if(!this.archivo) return 'Debe llamar al método init con el nombre del archivo'
        try {
            return JSON.parse(await fs.promises.readFile(this.archivo,'utf-8'))
        }
        catch(error) {
            console.log(error)
            throw new Error('Error en getAll')
        }
    }

    async getById(idBuscado) {
        if(!this.archivo) return 'Debe llamar al método init con el nombre del archivo'
        try {
            let products = await this.getAll()
            let product = products[this.getIndex(idBuscado,products)]
            return product
        }
        catch(error) {
            console.log(error)
            throw new Error('Error en getById')
        }
    }

    async add(productNew) {
        if(!this.archivo) return 'Debe llamar al método init con el nombre del archivo'
        try {
            let products = await this.getAll()
            let dto = ProductDTO(productNew)//, this.getNextId(products), this.getFyH())
            products.push(dto)
            await fs.promises.writeFile(this.archivo, JSON.stringify(products))
            return dto
        }
        catch(error) {
            console.log(error)
            throw new Error('Error en add')
        }
    }

    async deleteById(idParaBorrar) {
        if(!this.archivo) return 'Debe llamar al método init con el nombre del archivo'
        try {
            let products = await this.getAll()
            let product = products.splice(this.getIndex(idParaBorrar,products),1)
            await fs.promises.writeFile(this.archivo,  JSON.stringify(products))
            return product[0]
        }
        catch(error) {
            console.log(error)
            throw new Error('Error en deleteById')
        }
    }

    async updateById(idParaReemplazar, newProduct) {
        if(!this.archivo) return 'Debe llamar al método init con el nombre del archivo'
        try {
            let products = await this.getAll()
            let dto = ProductDTO(newProduct)//, idParaReemplazar, this.getFyH())
            products.splice(this.getIndex(idParaReemplazar,products),1,dto)
            await fs.promises.writeFile(this.archivo,  JSON.stringify(products))
            return dto
        }
        catch(error) {
            console.log(error)
            throw new Error('Error en updateById')
        }
    }
}

export default ProductFileDao


