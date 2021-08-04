//import { query } from 'express';
import firebase from 'firebase-admin';
import {firebaseAccount as serviceAccount} from '../Persistence/products.js'

async function CRUD()
{
    try {
        console.log('CRUD INIT');
        const db = firebase.firestore();
        const query = db.collection('clientes');
        
        let id = 2;
        let doc = query.doc(`${id}`);
        await doc.create({ nombre: 'José', dni:11223344});

        console.log('Datos Insertados');

    } catch(error) {console.log(error);}

}

export default class ProductsFirebase{
    constructor() {
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: "https://ecommerce-4940a.firebaseio.com"
        });
        
        console.log('Base Firebase conectada');
    }

    async add(data){
        try {
            console.log("Add Products Firebase");
            const newProduct = {
              title: data.title,
              price: data.price,
              thumbnail: data.thumbnail
            };

            const db = firebase.firestore();
            const query = db.collection('products');

            let id = Date.now();
            let doc = query.doc(`${id}`);
            await doc.create(newProduct);
            console.log('Datos Insertados');

        } catch (error) {
            console.log(`Error en proceso de base de datos - Add: ${error}`)
        }
    }

    async read()
    {
        try {
            console.log("Read Firebase");
        
            const db = firebase.firestore();
            const query = db.collection('products');            
            const querySnapshot = await query.get();
            let products = querySnapshot.docs;
    
            const response = products.map((product) => ({
                //id: parseInt(product.id),
                id: product.id,
                title : product.data().title,
                price : parseInt(product.data().price),
                thumbnail : product.data().thumbnail
            }));                        
    
            console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
        
    }

}