// services/speechToTextService.js
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const FormData = require('form-data');

const unlinkFile = util.promisify(fs.unlink);

// This example uses OpenAI Whisper API - you could replace with Google Speech-to-Text or Mozilla DeepSpeech
const transcribeAudio = async (filePath) => {
  try {
    // For OpenAI Whisper API
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('model', 'whisper-1');

    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );

    // Clean up the file after transcription
    await unlinkFile(filePath);
    
    return response.data.text;

  } catch (error) {
    console.error('Error in transcribeAudio:', error);
    throw new Error('Failed to transcribe audio');
  }
};

module.exports = {
  transcribeAudio,
};