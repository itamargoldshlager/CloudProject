var express = require('express')
var router = express.Router()
var ShoppingCartController = require('../Controller/ShoppingCartController')

router.get('/', ShoppingCartController.selectAllShoppingCartId);
router.post('/addProduct', ShoppingCartController.insertProductToShoppingCart)
router.delete('/removeProduct/:id', ShoppingCartController.removeProductFromShoppingCart)
module.exports = router