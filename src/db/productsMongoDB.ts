import { MongoClient } from "../../deps.ts";
import type { Product } from "../types/product.ts";

//const URI = "mongodb://127.0.0.1:27017";
//const URI = 'mongodb://localhost/ecommerce';
const URI = "mongodb://127.0.0.1:27017";
//const URI = 'mongodb+srv://ecommercedbUser:dbpass2021**@cluster0.ixflv.mongodb.net/ecommerce?retryWrites=true&w=majority';    

        // Mongo Connection Init
const client = new MongoClient();
try {
    console.log("Intentando conexión");
    await client.connect(URI);
    console.log("Base de datos conectada");
} catch (err) {
    console.log(err);
}

const db = client.database("ecommerce2");
const products = db.collection<Product>("products");
            

//Fake Db Queries
class Products {


    constructor() { 
    }

    findProductById = async (productId: string)=>{  
        console.log(productId);
         let prod0:Product = {
            productId:productId
         };
        let product = await products.findOne(prod0);
        return product || {productId:""}
    }

    // @description: GET single product
    // @route GET /api/products/:id
    // const getProduct = async ({
    //     params,
    //     response,
    // }: {
    //     params: { id: string };
    //     response: any;
    // }) => {
    //     console.log(params.id)
    //     const product = await products.findOne({ productID: params.id });

    //     if (product) {
    //     response.status = 200;
    //     response.body = {
    //         success: true,
    //         data: product,
    //     };
    //     } else {
    //     response.status = 404;
    //     response.body = {
    //         success: false,
    //         msg: "No product found",
    //     };
    //     }
    // };

    findProducts =async() => {
        const allProducts = await products.find({}).toArray();
        return allProducts
    }

    // @description: GET all Product
    // @route GET /api/products
    // findProducts = async ({ response }: { response: any }) => {
    //     try {
    //     const allProducts = await products.find({}).toArray();
    //     console.log(allProducts);
    //     if (allProducts) {
    //         response.status = 200;
    //         response.body = {
    //         success: true,
    //         data: allProducts,
    //         };
    //     } else {
    //         response.status = 500;
    //         response.body = {
    //         success: false,
    //         msg: "Internal Server Error",
    //         };
    //     }
    //     } catch (err) {
    //     response.body = {
    //         success: false,
    //         msg: err.toString(),
    //     };
    //     }
    // };
    

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


    // @description: ADD single product
    // @route POST /api/products
    // const addProduct = async ({
    //     request,
    //     response,
    // }: {
    //     request: any;
    //     response: any;
    // }) => {
    //     try {
    //     if (!request.hasBody) {
    //         response.status = 400;
    //         response.body = {
    //         success: false,
    //         msg: "No Data",
    //         };
    //     } else {
    //         const body = await request.body();
    //         const product = await body.value;
    //         await products.insertOne(product);
    //         response.status = 201;
    //         response.body = {
    //         success: true,
    //         data: product,
    //         };
    //     }
    //     } catch (err) {
    //     response.body = {
    //         success: false,
    //         msg: err.toString(),
    //     };
    //     }
    // };


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


    // @description: UPDATE single product
    // @route PUT /api/products/:id
    // const updateProduct = async ({
    //     params,
    //     request,
    //     response,
    // }: {
    //     params: { id: string };
    //     request: any;
    //     response: any;
    // }) => {
    //     try {
    //     const body = await request.body();
    //     const inputProduct = await body.value;
    //     await products.updateOne(
    //         { productID: params.id },
    //         { $set: { title: inputProduct.title, price: inputProduct.price, stock: inputProduct.stock, thumbnail:inputProduct.thumbnail } }
    //     );
    //     const updatedProduct = await products.findOne({ productID: params.id });
    //     response.status = 200;
    //     response.body = {
    //         success: true,
    //         data: updatedProduct,
    //     };
    //     } catch (err) {
    //     response.body = {
    //         success: false,
    //         msg: err.toString(),
    //     };
    //     }
    // };



    deleteProduct = async (
        productId : string
      )=>{
        await products.deleteOne({ productId: productId });
        let deletedProduct:Product = {
            productId:""
        }
        return deletedProduct
      };


    // @description: DELETE single product
    // @route DELETE /api/products/:id
    // const deleteProduct = async ({
    //     params,
    //     response,
    // }: {
    //     params: { id: string };
    //     request: any;
    //     response: any;
    // }) => {
    //     try {
    //     await products.deleteOne({ productID: params.id });
    //     response.status = 201;
    //     response.body = {
    //         success: true,
    //         msg: "Product deleted",
    //     };
    //     } catch (err) {
    //     response.body = {
    //         success: false,
    //         msg: err.toString(),
    //     };
    //     }
    // };
}

export const ProductsController = new Products();