import express from 'express'
import Carrito from '../controllers/carrito.js'

const carrito = new Carrito();

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

function createCarritoRouter() {
    const routerCarrito = express.Router()
    routerCarrito.use(express.json())
    routerCarrito.use(express.urlencoded({extended: true}));
  
    routerCarrito.get("/", (req, res) => {
        const prod = carrito.get()
        if (prod)
            return res.json(prod);

        res.status(404).json({
            error: "no hay productos en el carrito",});
    });


    routerCarrito.get("/:id", (req, res) => {
        const { id } = req.params;
        const prod = carrito.getById(id);
        if (prod)
            return res.json(prod);

        res.status(404).json({
        error: "producto no encontrado en el carrito",
        });
    });

    routerCarrito.post("/:id", (req, res) => {
        console.log(req.body);
        const { id } = req.params;
        let product = req.body;
        product.id = parseInt(id);
        const prod = carrito.add(product);

        if (prod){
           return res.redirect("/carrito");
           res.status(201).json(prod); 
        }
            

        res.status(404).json({
            error: "producto no valido",
            });
    })

    routerCarrito.delete("/:id", (req, res)=>{
        const { id } = req.params;
        const prod = carrito.remove(id);

        if (prod)
        return res.status(201).json(prod);

        res.status(404).json({
        error: "producto no válido",
        });
    })

    routerCarrito.put("/:id", (req, res)=>{
        const { id } = req.params;
        console.log(id);
        const prod = req.body;
        console.log( prod);
        if (carrito.update(id, prod))
            return res.status(201).json(carrito);

        res.status(404).send();
    })

    return routerCarrito;
}

export { createCarritoRouter }