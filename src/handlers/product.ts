import { Context, helpers, config } from "../../deps.ts";
import type { Product } from "../types/product.ts";
import {ProductsFactory} from "../db/productsFactory.ts";

//Load enviroment variables 
const { args } = Deno;
const { PERSISTENCE } = config({path: args[0]});

const pf = new ProductsFactory();
const Products = pf.getFactory(PERSISTENCE);
console.log('PERSISTENCIA =',PERSISTENCE)


export const findProduct = async (ctx: Context) => {
  try {
    let products: Product[] = await Products.findProducts();
    ctx.response.body = products;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const findProductById = async (ctx: Context) => {
  const productId = (helpers.getQuery(ctx, { mergeParams: true }).productId);
  try {
    let product: Product = await Products.findProductById(productId);
    ctx.response.body = product;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const createProduct = async (ctx: Context) => {
  try {
    const { title, price, stock, thumbnail } = await ctx.request.body().value;
    let createdProduct: Product = await Products.createProduct(title, price, stock, thumbnail);
    ctx.response.body = createdProduct;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const updateProduct = async (ctx: Context) => {
  try {
    const productId = (helpers.getQuery(ctx, { mergeParams: true }).productId).toString();
    const { title, price, stock, thumbnail } = await ctx.request.body().value;
    let updatedProduct: Product = await Products.updateProduct(productId, title, price, stock, thumbnail);
    ctx.response.body = updatedProduct;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const deleteProduct = async (ctx: Context) => {
  const productId = (helpers.getQuery(ctx, { mergeParams: true }).productId).toString();
  try {
    let deletedProduct: Product = await Products.deleteProduct(productId);
    ctx.response.body = deletedProduct;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};
