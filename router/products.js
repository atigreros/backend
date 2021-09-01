import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import config from '../config.js'

import ControllerProducts from '../controller/products.js'


class RouterProducts {

    constructor() {
        this.controllerProducts = new ControllerProducts();
    }

    start() {
        // GraphQL schema
        const schema = buildSchema(`
            type Query {
                products(_id: String): [Product]
            }
            type Mutation {
                addProduct(
                    title: String!,
                    price: Float!,
                    stock: Int!,
                    thumbnail: String!,
                ): Product,
                updateProduct(
                    _id: String!,
                    thumbnail: String!,
                ): Product,
                deleteProduct(
                    _id: String!,
                ): Product,                                
            },
            type Product {
                _id: String,
                title: String
                price: Float
                stock: Int
                thumbnail: String
            }    
        `);

        // resolve root
        const root = {
            products : _id => this.controllerProducts.getProducts(_id),
            addProduct : product =>this.controllerProducts.addProduct(product),
            updateProduct: (_id,products) => this.controllerProducts.updateProduct(_id,products),
            deleteProduct : _id => this.controllerProducts.deleteProduct(_id)
        };

        return graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: config.GRAPHIQL == 'true'
        })
    }
}

export default RouterProducts

/*import express from 'express'
const router = express.Router()

import ControllerProducts from '../controller/products.js'

class RouterProducts {

    constructor() {
        this.controllerProducts = new ControllerProducts()
    }

    start() {
        router.get('/:id?', this.controllerProducts.getProducts)
        router.post('/', this.controllerProducts.addProduct)
        router.put('/:id', this.controllerProducts.updateProduct)
        router.delete('/:id', this.controllerProducts.deleteProduct)

        return router
    }
}

export default RouterProducts*/