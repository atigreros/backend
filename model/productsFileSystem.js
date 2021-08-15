import fs from 'fs'

export default class persistenceFileSystem {
    constructor() {
        ;( async () => {
            try {
                await fs.promises.readFile('datos.txt')
            }
            catch {
                await fs.promises.writeFile('datos.txt', JSON.stringify([]))
            }
        })()
    }
    getProducts = async () => {
        try {
            let datos = await fs.promises.readFile('datos.txt')
            return JSON.parse(datos)
        }
        catch(error) {
            console.log(error)
        }
    }
    addProduct = async product => {
        try {
            let products = JSON.parse(await fs.promises.readFile('datos.txt'))
            products.push(product)
            await fs.promises.writeFile('datos.txt', JSON.stringify(products))
        }
        catch(error) {
            console.log(error)
        }
    }
}

