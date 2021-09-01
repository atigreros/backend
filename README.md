# backend
backend class

execute:
1. npm i

2. npm start

3. testing

http://localhost:8080/products
-------------------INSERT 1---------------------------
mutation {
    addProduct(
        title: "shaky",
        price: 59.4,
        stock: 4,
        thumbnail: "http://shaky"
    )
    {
        _id
        title
        price
        stock
        thumbnail
    }   
}
-------------------INSERT 2---------------------------
mutation {
    addProduct(
        title: "thomas",
        price: 12.4,
        stock: 3,
        thumbnail: "http://thomas"
    )
    {
        _id
        title
        price
        stock
        thumbnail
    }   
}
-------------------GETBYID 1---------------------------
query{
    products(_id:"1"){
    _id
    title
    price
    stock
    thumbnail
    }  
} 
-------------------GETBYID 2---------------------------
query{
    products(_id:"2"){
    _id
    title
    price
    stock
    thumbnail
    }  
}  

-------------------GET ALL---------------------------
{
    products{
    _id
    title
    price
    stock
    thumbnail
    }
    
}  
-------------------UPDATE---------------------------
mutation {
    updateProduct(_id:"2", thumbnail:"http://actualizado")
    {
        _id
        title
        price
        stock
        thumbnail
    }   
}
-------------------DELETE---------------------------
mutation {
    deleteProduct(_id:"2")
    {
        _id
        title
        price
        stock
        thumbnail
    }   
}


