import productDTO from '../DTOs/products.js'
import ProductsBaseDAO from './products.js'

import mongodb from 'mongodb';
const { MongoClient,ObjectId } = mongodb;

class ProductsDBMongoDAO extends ProductsBaseDAO {

    constructor(database, collection) {
        super()
        ;( async () => {
            console.log('Connecting to database...')
            /* ---------------------------------------------------------------- */
            /*                      Connecting to Mongo                         */
            /* ---------------------------------------------------------------- */
            // connecting at mongoClient
            const connection = await MongoClient.connect('mongodb://localhost',{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            const db = connection.db(database);
            this._collection = db.collection(collection);
            /* ---------------------------------------------------------------- */
            console.log('Data base connected')
        })()
    }

    getProducts = async _id => {
        try {
            if(_id) {
                console.log(_id)
                const product = await this._collection.findOne({_id: ObjectId(_id)})
                console.log(product)
                return [product]
            }
            else {
                const products = await this._collection.find({}).toArray()
                return products;
            }
        }
        catch(error) {
            console.log('Error getting product', error)
        }
    }

    addProduct = async product => {
        try{
            await this._collection.insertOne(product);
            return product
        }
        catch(error) {
            console.log('Error adding product', error)
            return product
        }

    }

    updateProduct = async (_id,product) => {
        try {
            await this._collection.updateOne({_id:ObjectId(_id)}, {$set: product});
            return product
        }
        catch(error) {
            console.log('Error updating Product', error)
            return product
        }
    }

    deleteProduct = async _id => {
        let product = productDTO({},_id,null)
        try {
            await this._collection.deleteOne({_id:ObjectId(_id)})
            return product
        }
        catch(error) {
            console.log('Error deleting product', error)
            return product
        }        
    }
}

export default ProductsDBMongoDAO