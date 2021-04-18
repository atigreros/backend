import express from 'express'
import Products from '../controllers/products.js'

const products = new Products();

/*to test
    {   "title": "sombrero voltiao",
        "price": 79.99,
        "thumbnail": "https://images-na.ssl-images-amazon.com/images/I/91XPsfS64ML._AC_SL1500_.jpg"
    }

    {
        "title": "mochila wayuu",
        "price": 46.19,
        "thumbnail": "https://www.wayuubags.co/images/Mochilas%20Wayuu%20Bolsos%2019.jpg"
    }

    {
        "title": "gato Botero",
        "price": 1378.37,
        "thumbnail": "https://sc04.alicdn.com/kf/Hb45adfe1ee0c41d68f614f80f7fe9e5bw.jpg"
    }

    {
        "title": "Precolombino Replica",
        "price": 51.37,
        "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_748587-MCO41994479660_052020-F.webp"
    }
*/

//routerProducts.use(express.json())
//routerProducts.use(express.urlencoded({extended:true}))

function createProductsRouter() {
    const routerProducts = express.Router()
    routerProducts.use(express.json())
    routerProducts.use(express.urlencoded({extended: true}));
  
    routerProducts.get("/listar", (req, res) => {
        const prod = products.get()
        if (prod)
            return res.json(prod);

        res.status(404).json({
            error: "no hay productos cargados",});
    });

    routerProducts.get("/listar/:id", (req, res) => {
        const { id } = req.params;
        const prod = products.getById(id);
        if (prod)
            return res.json(prod);

        res.status(404).json({
        error: "producto no encontrado",
        });
    });

    routerProducts.post("/guardar", (req, res) => {
        console.log(req.body);
        const prod = products.add(req.body);

        if (prod){
           return res.redirect("/api/productos");
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