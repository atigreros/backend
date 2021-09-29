import { Router} from "../../deps.ts";
import mainHandler from '../handlers/mainHandler.ts';

import {
    findProduct,
} from "../handlers/product.ts";


export const mainRouter = new Router()

.get('/login', mainHandler.getLogin)
.get("/products", findProduct) //Esto para probar que el enrutamiento funciona



