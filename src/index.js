import express from 'express'
import Products from './products.js'

const app = express();
const PORT = 8080;
const products = new Products();
//let products = 	[];

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

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/api/productos/listar", (req, res) => {
    const prod = products.get()
    if (prod)
        return res.json(prod);

    res.status(404).json({
        error: "no hay productos cargados",});
});

app.get("/api/productos/listar/:id", (req, res) => {
    const { id } = req.params;
    const prod = products.getById(id);
    if (prod)
        return res.json(prod);

    res.status(404).json({
      error: "producto no encontrado",
    });
});

app.post("/api/productos/guardar", (req, res) => {
    const prod = products.add(req.body);
    if (prod)
        return res.status(201).json(prod);

    res.status(404).json({
        error: "producto no valido",
        });
})

app.delete("/api/productos/borrar/:id", (req, res)=>{
    const { id } = req.params;
    const prod = products.remove(id);

    if (prod)
    return res.status(201).json(prod);

    res.status(404).json({
    error: "producto no valido",
    });
})

/*
app.get("/api/productos/listar", (req, res) => {
    if (products.length > 0) 
      return res.json(products);
      
    res.status(404).json({
        error: "no hay productos cargados",
      });
});

app.get("/api/productos/listar/:id", (req, res) => {
    const { id } = req.params;
    const productFiltered = products.filter((product) => product.id === parseInt(id))[0];
    if (productFiltered) {
      return res.json(productFiltered);
    }
    res.status(404).json({
      error: "producto no encontrado",
    });
});

app.post("/api/productos/guardar", (req, res) => {
    const product = req.body;
    console.log(product);
    product.id = products.length + 1;
    console.log(product);
    products.push(product);
    res.status(201).json(product);
})

app.delete("/api/productos/delete/:id", (req, res)=>{
    const { id } = req.params;
    products = products.filter(product => product.id !== parseInt(id));
    res.send();
})*/

const server = app.listen(PORT, ()=>{
    console.log(`HTTP Server listening on port: ${server.address().port}`)
})
