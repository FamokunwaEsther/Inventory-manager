const express = require('express');
const router1 = express.Router();

const productController = require('../controllers/productController');
const { protect, authoriseRoles } = require('../middleware/authMiddleware');

// Create product + email
router1.post(
  '/products',
  protect,
  authoriseRoles('admin'),
  productController.createProductEmail
);

// Get all products
router1.get('/products', productController.getProducts);

// Get single product
router1.get('/products/:id', productController.getProductById);

// Update product
router1.put('/products/:id', protect, productController.updateProduct);

// Delete product
router1.delete('/products/:id', protect, productController.deleteProduct);

// Update image
router1.put('/products/:id/image', protect, productController.updateProductImage);

// Manual email trigger
router1.patch('/createproductwithemail', productController.createProductEmail);

module.exports = router1;