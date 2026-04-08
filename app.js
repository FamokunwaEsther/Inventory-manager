require ('dotenv').config();
const express = require('express');
const connectDB = require('./configs/database');
const productRoutes = require('./routes/productroutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});