import express from 'express'
import Products from '../controllers/products.js'

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