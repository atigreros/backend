const socket = io.connect();

document.getElementById('miBoton').addEventListener('click', () => {

  /* Llenar los datos con los campos digitados por el usuario*/
  let newProduct =
  {
      title : document.getElementById('title').value,
      price : document.getElementById('price').value,
      thumbnail : document.getElementById('thumbnail').value
  }
  socket.emit('boton', newProduct)
})

let productosTemplate

socket.on('productsToClient', async (data) => {
  console.log('Esto se ve en el cliente: Productos en el cliente');
  console.log(data);
  addRow('ProductTable', data);
})

// socket.on('productos', async (productos) => {
//   if (!productosTemplate) {
//     const archivo = await fetch('plantillas/tabla.hbs')
//     const templateText = await archivo.text()
//     productosTemplate = ejs.compile(templateText);
//   }
//   const tablaHtml = productosTemplate({ productos });
//   document.getElementById('productos').innerHTML = tablaHtml
// })


function addRow(tableID, product) {
  console.log(product);
  let table = document.getElementById(tableID);
  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);

  let cell0 = row.insertCell(0);
  cell0.innerHTML = '<a href="/listar/' + product.id + '" class="text-white">' + product.id + '</a>';

  let cell1 = row.insertCell(1);
	cell1.innerHTML = product.title;

  let cell2 = row.insertCell(2);  
	cell2.innerHTML = product.price;

  let cell3 = row.insertCell(3);
	cell3.innerHTML = product.thumbnail;

}