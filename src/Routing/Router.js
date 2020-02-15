const express = require('express')
const router = express.Router()
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')
const ShoppingCartRouter = require('./ShoppingCartRouter')
const HealthRouter = require('./HealthRouter')

router.use('/Product', ProductRouter);
router.use('/Order', OrderRouter);
router.use('/ShoppingCart', ShoppingCartRouter);
router.use('/health', HealthRouter)
module.exports = router