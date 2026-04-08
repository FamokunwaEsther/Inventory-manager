const product  = require('../models/productmodel');

// Create a new product
exports.createProduct = async (req, res) => {
    const newProduct = await product.create(req.body);
    res.status(201).json(newProduct);
};

// Get all products by id
exports.getProducts = async (req, res) => {
    const products = await product.find();
    res.status(200).json(products);
};  

// Get a single product 
exports.getProductById = async (req, res) => {
    const product = await product.findById(req.params.id);  
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
};      

// Update a product
exports.updateProduct = async (req, res) => { 
    const updatedProduct = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const deletedProduct = await product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
};