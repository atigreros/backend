export default class persistenceMemory {
    constructor() {
        this.products = []
    }
    getProducts = async () => {
        return this.products
    }
    addProducts = async product => {
        this.products.push(product)
    }
}

