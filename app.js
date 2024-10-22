
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db'); 


// import routes
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/carts');
const reviewRoutes = require('./routes/reviews');
const wishlistRoutes = require('./routes/wishlists');
const contactRoutes = require('./routes/contact');


// env
require('dotenv').config();

// Initialize app
const app = express();

//MiddleWare
app.use(bodyParser.json());
app.use(morgan('tiny')); // Log requests
app.use(cors());



//Connect to MongoDB
connectDB();

// Use routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/contact', contactRoutes);


// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

