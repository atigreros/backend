import { product } from './product';
//import { productsFS } from './productsFS';
import { productsMySQL } from './productsMySQL';
//import { productsSQLite3 } from './productsSQLite3';
import { productsMongo } from './productsMongoDB';

export enum Persistence {
    Memory = 'MEM',
    Mongo =  'MONGODB',
    //FileSystem = 'FS',
    MySQL = 'MySQL',
    //SQLITE3 = 'SQLITE3',    
}

export class productsFactory {
    //Static nos permite usar el metodo sin crear una instancia
    static get(type: Persistence) {
        switch(type){
 /*           case Persistence.FileSystem:
                return new productsFS();
*/
            case Persistence.MySQL:
                return new productsMySQL();
            
/*            case Persistence.SQLITE3:
                const instanceSQLite3 = new productsSQLite3();
                instanceSQLite3.initDB();
                return instanceSQLite3;
*/
            case Persistence.Mongo:
                return new productsMongo();

           default: 
                return new product();
        }
    }
}