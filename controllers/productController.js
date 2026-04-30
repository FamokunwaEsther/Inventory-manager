const Product = require('../models/productmodel');
const cloudinary = require('../configs/cloudinaryConfig');
const User = require('../models/usermodel');
const sendEmail = require('../middleware/emailSender');


// UPDATE PRODUCT IMAGE
exports.updateProductImage = async (req, res) => {
    try {
        const productId = req.params.id;

        // 1. Get existing product first
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // 2. Delete old image if it exists
        if (existingProduct.image) {
            const publicId = existingProduct.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        // 3. Update product with new data (including image)
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({
            message: 'Error updating product image',
            error: error.message
        });
    }
};


// CREATE PRODUCT + EMAIL NOTIFICATION
exports.createProductEmail = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        const admins = await User.find({ role: 'admin' });
        const adminEmails = admins.map(admin => admin.email);

        const subject = 'New Product Added';
        const message = `
            <h3>New Product Added</h3>
            <p>A new product has been added to the inventory.</p>
            <ul>
                <li><strong>Product Name:</strong> ${newProduct.name}</li>
                <li><strong>Description:</strong> ${newProduct.description}</li>
            </ul>
        `;

        await sendEmail(adminEmails, subject, message);

        res.status(201).json({
            message: 'Product created and email sent',
            product: newProduct
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating product and sending email',
            error: error.message
        });
    }
};


// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
};


// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching product',
            error: error.message
        });
    }
};


// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
};


// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
};