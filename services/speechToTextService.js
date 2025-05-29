// services/speechToTextService.js
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const unlinkFile = util.promisify(fs.unlink);

const transcribeAudio = async (filePath) => {
  try {
    const audioData = fs.readFileSync(filePath);

    const response = await axios.post(
      'https://api.deepgram.com/v1/listen',
      audioData,
      {
        headers: {
          'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
          'Content-Type': 'audio/mp3', // or 'audio/mpeg' / 'audio/mp3' depending on your file type
        },
        params: {
          punctuate: true,
          language: 'en' // Change if you're using a different language
        }
      }
    );

    await unlinkFile(filePath);

    return response.data.results.channels[0].alternatives[0].transcript;

  } catch (error) {
    console.error('Error in transcribeAudio:', error?.response?.data || error.message);
    throw new Error('Failed to transcribe audio');
  }
};

module.exports = {
  transcribeAudio,
};
