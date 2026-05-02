const fakestoreController = require('../controllers/fakestoreController');
const express = require('express');
const router = express.Router();

// Get all products
router.get('/products', fakestoreController.getProducts);
// Get product by id
router.get('/products/:id', fakestoreController.getProductById);
// Create product
router.post('/products', fakestoreController.createProduct);    

module.exports = router;