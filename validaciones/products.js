const Joi = require('@hapi/joi')

const validar = product => {
    const productSchema = Joi.object({
        title: Joi.string().alphanum().required(),
        price: Joi.string().alphanum().require(),
        thumbnail: Joi.string().alphanum().required()
    })

    const { error } = productSchema.validate(product)
    if(error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}

module.exports = {
    validar
}
