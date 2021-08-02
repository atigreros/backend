const socket = io.connect();

////////////////////////////////////////
//Adding product
////////////////////////////////////////
//Send client product to server
// document.getElementById('miBoton').addEventListener('click', () => {
//   let newProduct =
//   {
//       title : document.getElementById('title').value,
//       price : document.getElementById('price').value,
//       thumbnail : document.getElementById('thumbnail').value
//   }
//   socket.emit('boton', newProduct)
// })

//Add product to table when server reply
socket.on('productsToClient', async (data) => {
  console.log('Esto se ve en el cliente: Productos en el cliente');
  console.log(data);
  addRow('ProductTable', data);
})

////////////////////////////////////////
//Pedir un producto
////////////////////////////////////////
//Send client product to server
document.getElementById('btnOrder').addEventListener('click', () => {

  console.log("click en order")
  let newOrder = $('#ProductTable tr:has(td)').map(function(i, v) {
    var $td =  $('td', this);
        return {
                 //id: $td.eq(0).text(),
                 title: $td.eq(1).text(),
                 price: $td.eq(2).text(),
                 quantity: $td.eq(4).children('#quantity').val()         
               }
  }).get();
 
  let newOrderWithFilter= newOrder.filter(function(product) {
    return product.quantity > 0 && 
        product.price > 0
  });

  let fullOrder ={
    order: newOrderWithFilter,
    username: document.getElementById('username').value,
    useremail: document.getElementById('useremail').value
  } 
 
  console.log("New order");
  console.log(fullOrder);
  socket.emit('order', fullOrder);
  alert("Su pedido fue enviado \n" +
        "¡Gracias!");
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
            <font color="#7AE5E9"> <strong>${elem.name}</strong></font>
            <font color="#7AE5E9"> <strong>${elem.lastName}</strong></font>
            <font color="#7AE5E9"> <strong>${elem.age}</strong></font>
            <font color="#7AE5E9"> <strong>${elem.nickName}</strong></font>
            <font color="#7AE5E9"> <strong>${elem.avatar}</strong></font>
            <font color="#DE6F94"> [${getDate()}]: </font>
            <font color="#94DC91"> <em>${elem.text}</em> </font>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    const mensaje = {
      email: document.getElementById('email').value,
      name: document.getElementById('name').value,
      lastName: document.getElementById('lastName').value,
      age: document.getElementById('age').value,
      nickName: document.getElementById('nickName').value,
      avatar: document.getElementById('avatar').value,
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