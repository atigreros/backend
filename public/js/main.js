const socket = io.connect();

////////////////////////////////////////
//Adding product
////////////////////////////////////////
//Send client product to server
document.getElementById('miBoton').addEventListener('click', () => {
  let newProduct =
  {
      title : document.getElementById('title').value,
      price : document.getElementById('price').value,
      thumbnail : document.getElementById('thumbnail').value
  }
  socket.emit('boton', newProduct)
})

//Add product to table when server reply
socket.on('productsToClient', async (data) => {
  console.log('Esto se ve en el cliente: Productos en el cliente');
  console.log(data);
  addRow('ProductTable', data);
})

////////////////////////////////////////
//Chat
////////////////////////////////////////
socket.on('messages', data => {
  // console.log(data);
  render(data);
});

function render(data) {
    const html = data.map((elem, index) => {
      return(`<div>
            <font color="#7AE5E9"> <strong>${elem.email}</strong></font>
            <font color="#DE6F94"> [${getDate()}]: </font>
            <font color="#94DC91"> <em>${elem.text}</em> </font>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    const mensaje = {
      email: document.getElementById('email').value,
      text: document.getElementById('texto').value
    };
    socket.emit('messages', mensaje);

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
}


////////////////////////////////////////
//Functions
////////////////////////////////////////
//return current Date
function getDate(){
  const d= new Date();
  return d.toLocaleString();
}

//Add product to table tableID
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