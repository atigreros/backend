import { mysql } from './config.js'
//import { sqlite3 } from './config.js'
import knexLib from 'knex'

import { MongoClient } from "../../deps.ts";
import type { Product } from "../types/product.ts";


class ProductsDB {

  constructor() {
      this.knex = knexLib(mysql);
      (async() => {
          let exists = await this.knex.schema.hasTable('products')
          if (!exists) {
              await this.knex.schema.createTable('products', table  => {
                  table.increments('id').primary();
                  table.string('title', 30);
                  table.float('price', 100);
                  table.string('thumbnail',200);
                  table.integer('stock');
                  table.string('productId',40);
              });
              console.log('Products table created!')
          }
      })()
  }

  findProductById = async (productId: string)=>{  
      console.log(productId);       
      let product = await this.knex('products').select('*').where('productId', productId);
      return product || {productId:""}
  }

  findProducts =async() => {
    const allProducts = await this.knex('products').select('*');
    return allProducts
  }

  // read(id) {
  //     return id? 
  //         this.knex('products').select('*').where('id', id) :
  //         this.knex('products').select('*')
  // }

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
      //await products.insertOne(product);
      await this.knex('products').insert(product) 
      return product      
  };
    
  // add(product) {
  //     return this.knex('products').insert(product) 
  // }

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
    await this.knex.from('products').where('productId', productId).update(productUpdate);
    let product = await this.knex('products').select('*').where('productId', productId);
    return updatedProduct || {productId:"0"};
  };

  // update(id, newStock) {
  //   return this.knex.from('products').where('id', id).update({ stock: newStock })
  // }

  /*update(producto, id) {
      return this.knex.from('products').where('id', id).update(product)
  }*/
  
  deleteProduct = async (
    productId : string
  )=>{
    return this.knex.from('products').where('productId', productId).del()
  };
  
  // delete(id) {
  //     return this.knex.from('products').where('id', id).del()
  // }
}

export default ProductsDB

/*import knex from 'knex'

class ProductsDB {
  constructor(config) {
    this.knex = knex(config)
  }

  async create() {
    return this.knex.schema.dropTableIfExists('products')
      .then(() => {
        return this.knex.schema.createTable('products', table => {
          table.increments('id').primary();
          table.string('title', 64).notNullable();
          table.float('price');
          table.string('thumbnail', 128).notNullable();
          table.integer('stock');
        })
      })
  }

  add(message) {
    return this.knex('products').insert(message)
  }

  select() {
    return this.knex('products').select()
  }

  delete(id) {
    return this.knex.from('products').where('id', id).del()
  }

  update(id, newStock) {
    return this.knex.from('products').where('id', id).update({ stock: newStock })
  }

  close() {
    return this.knex.destroy()
  }
}

export default ProductsDB*/