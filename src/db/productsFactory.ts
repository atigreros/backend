import { ProductsDB } from "./productsInterface.ts"
import { ProductsMap as productsMemory } from './product.ts';
//import { productsFS } from './productsFS';
import { ProductsMap as productsMySQL } from './productsMySQL.ts';
//import { productsSQLite3 } from './productsSQLite3';
import { ProductsMap as productsMongo } from './productsMongoDB.ts';


export class ProductsFactory {
    constructor() { 
    }

    getFactory(persistence: string): ProductsDB {
        console.log(persistence);
        switch(persistence){
            /*           case Persistence.FileSystem:
                            return new productsFS();
            */
                        case 'MySQL':
                            return productsMySQL;
                        
            /*            case Persistence.SQLITE3:
                            const instanceSQLite3 = new productsSQLite3();
                            instanceSQLite3.initDB();
                            return instanceSQLite3;
            */
                        case 'MONGO':
                            return productsMongo;
        
                        default: 
                            return productsMemory;
                    }
        //return productsMongo;
        //return productsMySQL;
        //return productsMemory
    }
}