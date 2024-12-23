
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db'); 


// import routes
const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');



// env
require('dotenv').config();

// Initialize app
const app = express();

//MiddleWare
app.use(bodyParser.json());
app.use(cors());



//Connect to MongoDB
connectDB();

// Use routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admins',adminRoutes);



// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

