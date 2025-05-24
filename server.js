// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const transcriptionRoutes = require('./routes/transcriptionRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transcriptions', transcriptionRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Speech-to-Text API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});