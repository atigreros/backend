import { ProductsDB } from "./productsInterface.ts"
import { ProductsMap as productsMemory } from './product.ts';
import { ProductsMap as productsMySQL } from './productsMySQL.ts';
import { ProductsMap as productsMongo } from './productsMongoDB.ts';


export class ProductsFactory {
    constructor() { 
    }

    getFactory(persistence: string): ProductsDB {
        console.log(persistence);
        switch(persistence){
                        case 'MYSQL':
                            return productsMySQL;

                        case 'MONGO':
                            return productsMongo;
        
                        default: 
                            return productsMemory;
                    }

    }
}