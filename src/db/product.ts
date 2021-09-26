import type { Product } from "../types/product.ts";

const products:Product[] = [{   
  "_id": "1",
  "title": "Despertador",
  "price": 79.99,
  "stock": 4,
  "thumbnail": "https://cdn4.iconfinder.com/data/icons/back-to-school-151/64/clock-morning-alarm-time-timer-128.png",
  "productId":"1"
  },
  
  {
  "_id": "2",
  "title": "Gato",
  "price": 46.19,
  "stock": 6,
  "thumbnail": "https://cdn3.iconfinder.com/data/icons/animals-105/150/icon_animal_gato-128.png",
  "productId":"2"
  },
  
  {
  "_id": "3",
  "title": "Anillo",
  "price": 21.37,
  "stock": 21,
  "thumbnail": "https://cdn0.iconfinder.com/data/icons/love-story-filled-outline-1/512/engagement_love_romantic_romance_wedding_ring-128.png",
  "productId":"3"
  },
  
  {
    "_id": "4",
    "title": "Paleta",
    "price": 21.37,
    "stock": 13,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/paint-color-pallete-brush-academy-128.png",
    "productId":"4"
  }
]

//Fake Db Queries
class Products {
  constructor() {
  }

  findProductById = async (productId: string)=>{
    let product: Product = <Product>products.find((product:Product) => product.productId == productId);
    return product || {}
  }

  findProducts (){
    return products
  }

  createProduct = async (
    title: string,
    price: number,
    stock: number,
    thumbnail: string
  )=>{
      //let id = products.length? (products[products.length-1]._id + 1) : 1
      //let idString = id.toString();
      let idString = Math.floor(Date.now() / 1000).toString()      
      let product:Product = {
        _id : idString,
        title,
        price,
        stock,
        thumbnail,
        productId : idString
      }
      products.push(product)
      return product
  };

  updateProduct = async (
    productId : string,
    title: string,
    price: number,
    stock: number,
    thumbnail: string
  )=>{
      let productUpdate:Product = {
        _id : productId,
        title,
        price,
        stock,
        thumbnail,
        productId : productId
      }
      let index = products.findIndex((product:Product) => product.productId == productId)
      //console.log(productUpdate, index)
      products.splice(index,1,productUpdate)
      return productUpdate
  };

  deleteProduct = async (
    _id : string
  )=>{
      let index = products.findIndex((product:Product) => product._id == _id)
      let product:Product = products.splice(index,1)[0]
      return product
  };
}

export const ProductsController = new Products();