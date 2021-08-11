const faker = require('faker')

//faker.locale = 'es'

const get = () => ({
    title: faker.name.title(),
    price: faker.finance.price(),
    thumbnail: faker.name.thumbnail(),
})

module.exports = {
    get
}