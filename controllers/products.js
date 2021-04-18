let products = [];

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
