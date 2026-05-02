const apiAdapter = require('../adapters/apiAdapter');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const data = await apiAdapter.getProducts();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get product by id
exports.getProductById = async (req, res) => {
    try {
        const data = await apiAdapter.getProductById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    try {
        const data = await apiAdapter.createProduct(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};