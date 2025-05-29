// controllers/transcriptionController.js
const supabase = require('../config/supabase');
const { transcribeAudio } = require('../services/speechToTextService');

const fs = require('fs');

// Upload and transcribe audio
exports.uploadAndTranscribe = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    // Transcribe the audio file
    const transcription = await transcribeAudio(req.file.path);

    // Get current user ID if authentication is implemented
    const userId = req.user?.id || 'anonymous';

    // Store the transcription in Supabase
    const { data, error } = await supabase
      .from('transcriptions')
      .insert([
        {
          user_id: userId,
          original_filename: req.file.originalname,
          transcription_text: transcription,
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.error('Supabase Error:', error);
      return res.status(500).json({ error: 'Failed to save transcription' });
    }

    return res.status(201).json({
      success: true,
      data: data[0],
    });

  } catch (error) {
    console.error('Controller Error:', error);
    return res.status(500).json({ error: 'Server error processing transcription' });
  }
};

// Get all transcriptions for a user
exports.getTranscriptions = async (req, res) => {
  try {
    // Get user ID if authentication is implemented
    // const userId = req.user?.id || 'anonymous';

    const { data, error } = await supabase
      .from('transcriptions')
      .select('*')
      // .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error);
      return res.status(500).json({ error: 'Failed to fetch transcriptions' });
    }

    return res.status(200).json({
      success: true,
      data: data,
    });

  } catch (error) {
    console.error('Controller Error:', error);
    return res.status(500).json({ error: 'Server error fetching transcriptions' });
  }
};

// Delete a transcription
exports.deleteTranscription = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('transcriptions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase Error:', error);
      return res.status(500).json({ error: 'Failed to delete transcription' });
    }

    return res.status(200).json({
      success: true,
      message: 'Transcription deleted successfully',
    });

  } catch (error) {
    console.error('Controller Error:', error);
    return res.status(500).json({ error: 'Server error deleting transcription' });
  }
};