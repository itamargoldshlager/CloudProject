var express = require('express')
var router = express.Router()
var OrderController = require('../Controller/OrderController')

router.get('/', OrderController.getAllOrders);

module.exports = router