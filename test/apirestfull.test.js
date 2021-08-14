const supertest = require('supertest')
// const request = supertest('http://localhost:8080')
const mongoose = require('mongoose')

const expect = require('chai').expect
const generador = require('../generador/products')

const app = require('../server')

let product = generador.get()
console.log(product)

describe('test api rest full', () => {

    before(async () => {
        await mongoose.connect('mongodb://localhost/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })

    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            let response = await supertest(app).get('/api')
            expect(response.status).to.eql(200)
        })
    })
    describe('POST', () => {
        it('debería incorporar un producto', async () => {
            let product = generador.get()

            let response = await supertest(app).post('/api').send(product)
            expect(response.status).to.eql(200)

            const prod = response.body
            expect(prod).to.include.keys('title', 'price', 'thumbnail')
            expect(prod.title).to.eql(product.title)
            expect(prod.price).to.eql(product.price)
            expect(prod.thumbnail).to.eql(product.thumbnail)
        })
    })
})
