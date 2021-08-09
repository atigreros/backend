let express = require('express');
let router = express.Router();
let debug = require('debug')('myapp:productos');

const products = [];

router.use(express.urlencoded({extended: true}))

/* GET products listing. */
// router.get('/', function(req, res, next) {
//   res.render('form');
// });
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Products' });
});


/* GET productos listing. */
// router.post('/', function(req, res, next) {
//   //res.send('respond with a resource GET all');
//   console.log('POST', products);
//   //debug('Listening on ' + JSON.stringify(productos));
//   res.json({ products })
// });
/* GET productos listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource GET all');
  console.log('GET', productos);
  //debug('Listening on ' + JSON.stringify(productos));
  res.json({ productos })
});


/* GET ID productos listing. */
router.get('/:index', function(req, res, next) {
  //res.send('respond with a resource GET index');
  let index = parseInt(req.params.index)
  res.json({ producto: productos[index] })
});


/* POST productos listing. */
router.post('/', function(req, res, next) {
  //res.send('respond with a resource POST');

  let { title, price, thumbnail } = req.body
  let product = { title, price: Number(price), thumbnail }

  products.push(product)
  console.log('POST', product);

  res.redirect('/products/form')
});

/* PUT products listing. */
router.put('/:index', function(req, res, next) {
  //res.send('respond with a resource PUT');
  let index = parseInt(req.params.index)

  let { title, price, thumbnail } = req.body
  let product = { title, price: Number(price), thumbnail }

  products.splice(index, 1, product)
  res.json({ product })
});


/* DELETE products listing. */
router.delete('/:index', function(req, res, next) {
  //res.send('respond with a resource DELETE');

  let index = parseInt(req.params.index)
  let product = products.splice(index, 1)
  res.json({ product })
});

module.exports = router;


