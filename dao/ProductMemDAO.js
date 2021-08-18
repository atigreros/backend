import { ProductDTO } from "../dto/products.js"

class ProductMemDao {

    constructor(){
        this.products = []
    }

    getNextId() {
        let lg = this.products.length
        return lg? this.products[lg-1].id + 1 : 1
    }
    getIndex(id) {
        return this.products.findIndex(product => product.id === id)
    }
    getFyH() {
        return new Date().toLocaleString()
    }

    getAll() {
        return this.products
    }

    getById(idBuscado) {
        return this.products[this.getIndex(idBuscado)]
    }

    add(newProduct) {
        let dto = ProductDTO(newProduct, this.getNextId(), this.getFyH())
        this.products.push(dto)
        return dto
    }

    deleteById(idParaBorrar) {
        let products = this.products.splice(this.getIndex(idParaBorrar),1)
        return product[0]
    }

    updateById(idParaReemplazar, newProduct) {
        let dto = PersonaDTO(newProduct, idParaReemplazar, this.getFyH())
        this.products.splice(this.getIndex(idParaReemplazar),1,dto)
        return dto
    }
}

export default ProductMemDao


