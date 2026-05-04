const express = require('express');
const router = express.Router();
const {getProducts, updateProduct ,createProduct , deleteproduct} = require('../controllers/productController.js')

router.get('/products', getProducts);

router.put('/products/:id', updateProduct);

router.post('/products', createProduct);

router.delete('/products/:id', deleteproduct);

module.exports = router