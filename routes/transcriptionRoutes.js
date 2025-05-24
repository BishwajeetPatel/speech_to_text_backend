// routes/transcriptionRoutes.js
const express = require('express');
const router = express.Router();
const transcriptionController = require('../controllers/transcriptionController');
const upload = require('../middleware/upload');

// Create directory for uploads if it doesn't exist
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// POST route for uploading and transcribing audio
router.post(
  '/upload',
  upload.single('audio'),
  transcriptionController.uploadAndTranscribe
);

// GET route for retrieving transcriptions
router.get('/', transcriptionController.getTranscriptions);

// DELETE route for deleting a transcription
router.delete('/:id', transcriptionController.deleteTranscription);

module.exports = router;