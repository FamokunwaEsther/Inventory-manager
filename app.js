require ('dotenv').config();
const express = require('express');
const connectDB = require('./configs/database');

const productRoutes = require('./routes/productroutes');
const userRoutes = require('./routes/userRoute');
const fakestoreRoutes = require('./routes/fakestoreRoutes');

const app = express();

app.use(express.json());

//DB Connection
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api', userRoutes);
app.use('/api/fakestoreRoutes', fakestoreRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});