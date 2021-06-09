import express from 'express'
import Products from '../controllers/products.js'
import faker from 'faker';
faker.locale = 'es'

const products = new Products();
//const socket = io.connect();


function createProductsRouter() {
    const routerProducts = express.Router()
    routerProducts.use(express.json())
    routerProducts.use(express.urlencoded({extended: true}));
  
    routerProducts.get('/listar', (req, res) => {
        const prod = products.get()
        console.log(prod)
        res.render('listar', {products: prod})//return res.json(prod);
        //res.render('/guardarSocket', {products: prod})

        //res.status(404).json({
           // error: "no hay productos cargados",});
    });

    //faker challenger
    function crearCombinacionAlAzar(id) {
        return {
            id,
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        }
    }
    
    routerProducts.get('/productos/vista-test', (req, res) => {
        const cant = Number(req.query.cant) || 10
        const prod = Array.from(Array(cant), (v, i) => crearCombinacionAlAzar(i + 1));
        res.render('test', {products: prod})
    })
    //end faker challenger

    routerProducts.get("/listar/:id", (req, res) => {
        const { id } = req.params;
        const prod = products.getById(id);
        console.log(prod)
        res.render('listarid', {products: prod})//return res.json(prod);
        /*if (prod)
            return res.json(prod);

        res.status(404).json({
        error: "producto no encontrado",
        });*/
    });


    routerProducts.post("/guardar", (req, res) => {
        console.log(req.body);        
        const prod = products.add(req.body);

        if (prod){
           return res.redirect("/listar");
           res.status(201).json(prod); 
        }
           

        res.status(404).json({
            error: "producto no valido",
            });
    })


    routerProducts.delete("/borrar/:id", (req, res)=>{
        const { id } = req.params;
        const prod = products.remove(id);

        if (prod)
        return res.status(201).json(prod);

        res.status(404).json({
        error: "producto no valido",
        });
    })

    routerProducts.put("/:id", (req, res)=>{
        const { id } = req.params;
        console.log(id);
        const prod = req.body;
        console.log( prod);
        if (products.update(id, prod))
            return res.status(201).json(products);

        res.status(404).send();
    })

    return routerProducts;
}

export { createProductsRouter }