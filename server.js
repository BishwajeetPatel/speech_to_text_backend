// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const transcriptionRoutes = require('./routes/transcriptionRoutes');

// Load environment variables
dotenv.config();

const corsOptions = {
  origin: [
    'http://localhost:5173',           // Vite dev server
    'http://localhost:3000',           // React dev server
    'http://localhost:4000',           // Backend dev server
    'https://speech-to-text-frontend-2q1v.onrender.com', // Your production frontend
    process.env.FRONTEND_URL           // Environment variable for flexibility
  ], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Routes
app.use('/api/transcriptions', transcriptionRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Speech-to-Text API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('CORS enabled for:', corsOptions.origin);
});
