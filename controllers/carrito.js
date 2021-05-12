import {ShoppingCart} from '../models/shoppingCart.js'

let products = [
  {  
    "id": 1,
    "timestamp": "2021/05/09 17:41:00",
    "title": "sombrero voltiao",
    "price": 79.99,
    "thumbnail": "https://images-na.ssl-images-amazon.com/images/I/91XPsfS64ML._AC_SL1500_.jpg"
  },

  {
    "id": 3,
    "timestamp": "2021/05/10 15:38:07",
    "title": "gato Botero",
    "price": 1378.37,
    "thumbnail": "https://sc04.alicdn.com/kf/Hb45adfe1ee0c41d68f614f80f7fe9e5bw.jpg"
  },

];

export default class carritoController{
  constructor() {
    this.carrito = new ShoppingCart(0,products);
  }

  add(product) {
    if (product.id ==="" || product.id ==="undefined") return false;
    if (product.title ==="" || product.title ==="undefined") return false;
    if (product.price ==="" || product.price ==="undefined") return false;
    if (product.thumbnail ==="" || product.thumbnail ==="undefined") return false;
    
    //Verificar que no exista otro producto con el mismo id
    const carritoFiltered = this.carrito.products.filter((carrito) => parseInt(carrito.id) === parseInt(product.id))[0];
    if (carritoFiltered) 
      return false;

    product.timestamp = Date.now();
    this.carrito.products.push(product);
    return this.carrito.products;
  }

  get() {
    if (this.carrito.products.length > 0) 
      return this.carrito.products;
    else
      return false;
  }

  getById(id){
    const carritoFiltered = this.carrito.products.filter((carrito) => carrito.id === parseInt(id))[0];
    if (carritoFiltered) 
      return carritoFiltered;
    else
      return false;
  }

  remove(id) {
    this.carrito.products = this.carrito.products.filter((product) => product.id !== parseInt(id));
    return this.carrito.products;
  }
	
	update(id, product){
    carrito = carrito.map((prod) => {
      if (prod.id === parseInt(id)){
        prod.title = product.title;
        prod.price = product.price;
        prod.thumbnail = product.thumbnail;
      }
      return prod;
    });
    return carrito;
 	}

}
