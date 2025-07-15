const express = require('express');
const cors = require('cors');
const path = require('path');
// require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// const connectDB = require('./config/db'); // <-- Add this line
// connectDB(); // <-- And this line

const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');
const exploreRoutes = require('./routes/exploreRoutes');
const galleryRoutes = require('./routes/galleryRoutes'); 

const { port } = require('./config/config');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const morgan = require('morgan');

const app = express();

// ==============================
// Middleware
// ==============================
app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// ==============================
// API Routes
// ==============================

app.use('/api/image', imageRoutes);       // 🔧 Image generation, user uploads
app.use('/api/auth', authRoutes);         // 🔒 Registration, login, user
app.use('/api/explore', exploreRoutes);   // 🌍 Public explore feed
app.use('/api/gallery', galleryRoutes);   // 🖼️ Gallery routes

// ==============================
// Swagger Docs
// ==============================

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ==============================
// Root Route
// ==============================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ==============================
// Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
});

// ==============================
// Server Start
// ==============================

app.listen(port, () => {
  console.log(`🚀 Server running at: http://localhost:${port}`);
  console.log(`📚 API Docs available at: http://localhost:${port}/api-docs`);
});