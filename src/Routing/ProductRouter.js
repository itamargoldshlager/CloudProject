const express = require('express')
const router = express.Router()
const ProductController = require('../Controller/ProductController')

router.get('/all',ProductController.getAllProducts)
router.get('/category/:category', ProductController.getProductsByCategory)
router.get('/id/:id', ProductController.getProductById)
router.post('/add/:id',ProductController.addNewProduct);
router.post('/addProduct',ProductController.addNewProductToDb);
router.get('/mulitipleid/:ids',ProductController.getMulitpleProductsById)
module.exports = router