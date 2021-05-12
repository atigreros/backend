let products = [
  {
    "id": 1,
    "title": "sombrero voltiao",
    "price": 79.99,
    "thumbnail": "https://images-na.ssl-images-amazon.com/images/I/91XPsfS64ML._AC_SL1500_.jpg"
  },

  {
    "id": 2,
    "title": "mochila wayuu",
    "price": 46.19,
    "thumbnail": "https://www.wayuubags.co/images/Mochilas%20Wayuu%20Bolsos%2019.jpg"
  },

  {
    "id": 3,
    "title": "gato Botero",
    "price": 1378.37,
    "thumbnail": "https://sc04.alicdn.com/kf/Hb45adfe1ee0c41d68f614f80f7fe9e5bw.jpg"
  },

  {
    "id": 4,
    "title": "Precolombino Replica",
    "price": 51.37,
    "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_748587-MCO41994479660_052020-F.webp"
  }
];

export default class productController{
  constructor() {
  }

  add(product) {
    if (product.title ==="" || product.title ==="undefined") return false;
    if (product.price ==="" || product.price ==="undefined") return false;
    if (product.thumbnail ==="" || product.thumbnail ==="undefined") return false;
    
    product.id = products.length + 1;
    products.push(product);
    return products;
  }

  get() {
    if (products.length > 0) 
      return products;
    else
      return false;
  }

  getById(id){
    const productFiltered = products.filter((product) => product.id === parseInt(id))[0];
    if (productFiltered) 
      return productFiltered;
    else
      return false;
  }

  remove(id) {
    products = products.filter((product) => product.id !== parseInt(id));
    return products;
  }
	
	update(id, product){
    products = products.map((prod) => {
      if (prod.id === parseInt(id)){
        prod.title = product.title;
        prod.price = product.price;
        prod.thumbnail = product.thumbnail;
      }
      return prod;
    });
    return products;
 	}

}
