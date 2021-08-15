import model from '../model/products.js'
import FirstConnection from './singleton.js'

/* -------------------------------------- */
/*           HTML/DATA ON WIRE            */
/* -------------------------------------- */
export const getProducts = async () => {
    return await model.getProducts()
}

export const addProduct = async product => {
    await model.addProduct(product)
}

/* -------------------------------------- */
/*                SINGLETON               */
/* -------------------------------------- */
export const getHour = () => {
    return new FirstConnection().getHour()
}
