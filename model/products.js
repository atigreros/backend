import persistenceMemory from './productsMemory.js'
import persistenceFileSystem from './productsFileSystem.js'
import persistenceMongo from './productsMongoDB.js'
import config from '../config.js'

//console.log(`NODE_ENV=${config.NODE_ENV}`);

/* -------------------------------------- */
/*                FACTORY                 */
/* -------------------------------------- */
class FactoryProductModel {
    static set(config) {
        const opcion = config.PERSISTENCE
        console.log('**** ENVIROMENT SELECTED **** [' + config.NODE_ENV + ']')
        console.log('**** PERSISTENCE SELECTED **** [' + opcion + ']')
        //console.log(`NODE_ENV=${config.NODE_ENV}`);
        switch(opcion) {
            case 'Mem': return new persistenceMemory()
            case 'File': return new persistenceFileSystem()
            case 'Mongo': return new persistenceMongo()
        }
    }
}

//const opcion = process.argv[2] || 'Mem'
export default FactoryProductModel.set(config)