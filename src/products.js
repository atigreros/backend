let products = [];

export default class productController{
    constructor() {
    }

    add(product) {
      if (product.title ==="" || product.title ==="undefined") return false;
      
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
}
