import persistenceMemory from './productsMemory.js'
import persistenceFileSystem from './productsFileSystem.js'
import persistenceMongo from './productsMongoDB.js'

/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */
class FactoryProductModel {
    static set(opcion) {
        console.log('**** PERSISTENCIA SELECCIONADA **** [' + opcion + ']')
        switch(opcion) {
            case 'Mem': return new persistenceMemory()
            case 'File': return new persistenceFileSystem()
            case 'Mongo': return new persistenceMongo()
        }
    }
}

const opcion = process.argv[2] || 'Mem'
export default FactoryProductModel.set(opcion)