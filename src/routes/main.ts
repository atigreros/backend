import { Router} from "../../deps.ts";
import mainHandler from '../handlers/mainHandler.ts';

import {
    findProduct,
} from "../handlers/product.ts";


export const mainRouter = new Router()

.get('/', mainHandler.getLogin)
.get('/login', mainHandler.getLogin)
.post('/login', mainHandler.postLogin)
.get('/register', mainHandler.getRegister)
.post('/register', mainHandler.postRegister)
.get('/products', findProduct) //Esto para probar que el enrutamiento funciona



