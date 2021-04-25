let products = [    {   
"id": 1,
"title": "Despertador",
"price": 79.99,
"thumbnail": "https://cdn4.iconfinder.com/data/icons/back-to-school-151/64/clock-morning-alarm-time-timer-128.png"
},

{
"id": 2,
"title": "Gato",
"price": 46.19,
"thumbnail": "https://cdn3.iconfinder.com/data/icons/animals-105/150/icon_animal_gato-128.png"
},

{
"id": 3,
"title": "Anillo",
"price": 21.37,
"thumbnail": "https://cdn0.iconfinder.com/data/icons/love-story-filled-outline-1/512/engagement_love_romantic_romance_wedding_ring-128.png"
},

{
  "id": 3,
  "title": "Paleta",
  "price": 21.37,
  "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/paint-color-pallete-brush-academy-128.png"
  },
  


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
