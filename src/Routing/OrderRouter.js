var express = require('express')
var router = express.Router()
var OrderController = require('../Controller/OrderController')

router.get('/all', OrderController.getAllOrders);
router.post('/addOrder', OrderController.addOrder);
router.post('/changeStatus', OrderController.changeStatus);
router.get('/productsIds/:id', OrderController.getProductsIdByOrder);
module.exports = router