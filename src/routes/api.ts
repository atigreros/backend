import { Router} from "../../deps.ts";
import {
    createProduct,
    deleteProduct,
    findProduct,
    findProductById,
    updateProduct} from "../handlers/product.ts";
//import {ProductController} from "../handlers/product.ts";

export const apiRouter = new Router()

//Producto routes
.get("/products", findProduct)
.get("/products/:productId", findProductById)
.delete("/products/:productId", deleteProduct)
.put("/products/:productId", updateProduct)
.post("/products", createProduct);
