// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const transcriptionRoutes = require('./routes/transcriptionRoutes');

// Load environment variables
dotenv.config();
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Your frontend URL
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
  res.send('Speech-to-Text API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});