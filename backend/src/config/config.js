require('dotenv').config(); // Load environment variables

const connectDB = require('./db');

// Connect to MongoDB
connectDB();

const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
};

module.exports = config;
