import { config } from "../../deps.ts";
import { MongoClient } from "../../deps.ts";
import type { Product } from "../types/product.ts";
import { ProductsDB } from "./productsInterface.ts"


//Load enviroment variables 
const { args } = Deno;
const { STRMONGO } = config({path: args[0],  export: true });
const { DBMONGO } = config({path: args[0],  export: true });
const { TABLEMONGO } = config({path: args[0],  export: true });
const URI = STRMONGO;

//const URI = "mongodb://127.0.0.1:27017";
//const URI = 'mongodb+srv://ecommercedbUser:dbpass2021**@cluster0.ixflv.mongodb.net/ecommerce?retryWrites=true&w=majority';    

// Mongo Connection Init
const client = new MongoClient();
try {
    console.log("Connecting to Mongo...");
    await client.connect(URI);
    console.log("Mongo Connected");
    console.log(DBMONGO);
    console.log(TABLEMONGO);
} catch (err) {
    console.log(err);
}

const db = client.database(DBMONGO);
const products = db.collection<Product>(TABLEMONGO);           

//Fake Db Queries
class Products implements ProductsDB{

    constructor() {
    }

    // @description: GET single product
    // @route GET /api/products/:id
    findProductById = async (productId: string) =>{  
        console.log(productId);
         let prod0:Product = {
            productId:productId
         };
        let product = await products.findOne(prod0);
        return product || {productId:""}
    }

    // @description: GET all Product
    // @route GET /api/products
    findProducts =async() => {
        const allProducts = await products.find({}).toArray();
        return allProducts
    }


    // @description: ADD single product
    // @route POST /api/products
    createProduct = async (
        title: string,
        price: number,
        stock: number,
        thumbnail: string
      )=>{
          let product : Product = {
            title,
            price,
            stock,
            thumbnail,
            productId: Math.floor(Date.now() / 1000).toString()
          }
          await products.insertOne(product);
          return product
      };


    // @description: UPDATE single product
    // @route PUT /api/products/:id
    updateProduct = async (
        productId : string,
        title: string,
        price: number,
        stock: number,
        thumbnail: string
      )=>{
          let productUpdate:Product = {
            title,
            price,
            stock,
            thumbnail,
            productId: productId}

        await products.updateOne(
             { productID: productId },
             { $set: { title: productUpdate.title, 
                price: productUpdate.price, 
                stock: productUpdate.stock, 
                thumbnail:productUpdate.thumbnail,
                productId: productUpdate.productId} }
         );
         const updatedProduct = await products.findOne({ productId: productId });
         return updatedProduct || {productId:"0"};
      };


    // @description: DELETE single product
    // @route DELETE /api/products/:id
    deleteProduct = async (
        productId : string
      )=>{
        await products.deleteOne({ productId: productId });
        let deletedProduct:Product = {
            productId:""
        }
        return deletedProduct
      };
}

export const ProductsMap = new Products();