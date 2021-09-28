import { Router} from "../../deps.ts";
import {
    createProduct,
    deleteProduct,
    findProduct,
    findProductById,
    updateProduct} from "../handlers/product.ts";
//import {ProductController} from "../handlers/product.ts";

export const router = new Router()

//Producto routes
.get("/api/products", findProduct)
.get("/api/products/:productId", findProductById)
.delete("/api/products/:productId", deleteProduct)
.put("/api/products/:productId", updateProduct)
.post("/api/products", createProduct);
