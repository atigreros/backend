const axios = require('axios')

//const url = 'http://localhost:8080'

axios.get('http://localhost:3000/products/listarid?index=0')
  .then(response => {
    // Obtenemos los datos
    const product = response.data
    console.log(product);
  })
  .catch(error => {
    console.log(error)
  })