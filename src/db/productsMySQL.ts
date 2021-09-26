import { Client } from "../../deps.ts";
import type { Product } from "../types/product.ts";

const client= await new Client();

try {
  console.log("Trying MySQL connection");
  client.connect({
    hostname: "127.0.0.1",
    username: "root",
    db: "prueba",
    poolSize: 3, // connection limit
    password: "aleja78*",
  });

  console.log("MySQL database connected");
} catch (err) {
  console.log(err);
}

//Fake Db Queries
class Products {

  constructor() { 
  }

  findProductById = async (productId: string)=>{  
    const product = await client.query(`select * from products where productId=${productId}`);
    return product
  }

  findProducts =async() => {
    const allProducts = await client.query(`select * from products`);
    return allProducts
  }

  createProduct = async(
    title: string,
    price: number,
    stock: number,
    thumbnail: string
  )/*: Product*/ => {
      /*let product:Product = {
        title,
        price,
        stock,
        thumbnail,
      }*/
      const productId = Math.floor(Date.now() / 1000).toString();

      //products.push(product)
      const products = await client.query(`insert into products (title, price, stock, thumbnail, productId) values(${title}, ${price}, ${stock}, ${thumbnail}, ${productId})`);
      return products
  };

  updateProduct = (
    productId : string,
    title: string,
    price: number,
    stock: number,
    thumbnail: string,
  ): Product => {
      let productUpdate:Product = {
        title,
        price,
        stock,
        thumbnail,
        productId: productId}
      // let index = products.findIndex((product:Product) => product._id == _id)
      // //console.log(productUpdate, index)
      // products.splice(index,1,productUpdate)
      return productUpdate
  };

  deleteProduct = async(
    productId : string
  )/*: Product*/ => {
    const products = await client.query(`delete from products where productId=${productId}`);
    return products
  };

};

export const ProductsController = new Products();
