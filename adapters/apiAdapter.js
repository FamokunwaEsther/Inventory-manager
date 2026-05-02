const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all products
exports.getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

// Get product by ID
exports.getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching product');
  }
};

// Create product
exports.createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/products', productData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating product');
  }
};