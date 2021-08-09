//const { Console } = require('console');
let express = require ('express');
let {graphqlHTTP} = require('express-graphql');
let {buildSchema} = require('graphql');

let path = require('path');
let productsRouter = require('../routes/products');

/*let products = [
    {
        title:"P1",
        price:11,
        thumbnail:"www.google.com"
    },
    {
        title:"P2",
        price:14.2,
        thumbnail:"www.google.com"
    },
    {
        title:"P3",
        price:94.2,
        thumbnail:"www.duckduckgo.com"
    },
]*/

const products = []

const schema = buildSchema(`
    type Query {
        message: String,
        products: [Product]
    }
    type Mutation {
        createProduct(title: String!, price: String!, thumbnail: String!): Product
    },
    type Product {
        title: String,
        price: String,
        thumbnail: String
    }
`);

/*    type Query {
        message: String,
        products: [Product],
        product(title: String!): Product
    }
    type Mutation {
        createProduct(title: String!, price: Float!, thumbnail: String!): Product
    },
    type Product {
        title: String,
        price: Float,
        thumbnail: String
    }
`);*/

let createProduct = function(product) {
    // console.log('Title: ',product.title);
    // console.log('Price: ',product.price);
    // console.log('Thumbnail: ',product.thumbnail);   
    products.push(product);
    return product
}

let getProduct = function(product){
    //connect to database and return product according to id
    return products.filter(element => {
        return (element.title == product.title);
    })[0];
}

let getProducts = function(){
    //connect to database and return data
    return products;
}

let updateProduct = function(title){
    //connect to database and update
    return products;
}

let deleteProduct = function(title){
    //connect to database and return status
    return ok;
}

// Root resolver
var root = {
    message: () => { return 'GraphQL: Ingrese Producto' } ,
    products : () => products,
    createProduct : createProduct
};
/*var root = {
    message: () => { return 'GraphQL: Ingrese Producto' } ,
    products : () => products,
    product : getProduct,
    createProduct : createProduct
};*/


// Create an express server and a GraphQL endpoint
const app = express();
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.use(express.json());
app.use('/products', productsRouter);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor express GraphQL escuchando en http://localhost:${server.address().port}/graphql`));
server.on('error', error => console.error('Error en Servidor GraphQL', error))