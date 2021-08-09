var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource GET');
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource POST');
});

/* PUT users listing. */
router.put('/', function(req, res, next) {
  res.send('respond with a resource PUT');
});

/* DELETE users listing. */
router.delete('/', function(req, res, next) {
  res.send('respond with a resource DELETE');
});

module.exports = router;
