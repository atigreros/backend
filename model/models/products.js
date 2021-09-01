import Joi from 'joi'

class Products {

    constructor(title, price, stock, thumbnail) {
        this.title = title
        this.price = price
        this.stock = stock
        this.thumbnail = thumbnail
    }

    equals(newProducts) {
        if (!(newProducts instanceof Products)) {
            return false
        }
        if (this.title != newProducts.title) {
            return false
        }
        if (this.price != newProducts.price) {
            return false
        }
        if (this.stock != newProducts.stock) {
            return false
        }
        if (this.thumbnail != newProducts.thumbnail) {
            return false
        }
        return true
    }

    static validar(product,required) {
        //console.log(product,required)
        const ProductSchema = Joi.object({
            title: required? Joi.string().required() : Joi.string(),
            price: required? Joi.number().required() : Joi.number(),
            stock: required? Joi.number().required() : Joi.number().integer(),
            //stock: required? Joi.number().integer().required() : Joi.number().integer(),
            thumbnail: required? Joi.string().required() : Joi.string(),
        })

        const { error } = ProductSchema.validate(product)
        if (error) {
            throw error
        }
    }
}

export default Products