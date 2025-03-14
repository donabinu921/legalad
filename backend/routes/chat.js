const express = require('express');
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');

const router = express.Router();

// GET conversation messages for a user
router.get('/conversations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const conversation = await Conversation.findOne({ userId });
    
    // Return empty array if no conversation exists (matches frontend expectation)
    if (!conversation) {
      return res.status(200).json([]);
    }
    
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

// POST to create or update conversation messages
router.post('/conversations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { messages } = req.body;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Messages must be provided as an array' 
      });
    }

    // Find and update or create new conversation
    const conversation = await Conversation.findOneAndUpdate(
      { userId },
      { 
        messages,
        lastUpdated: Date.now()
      },
      { 
        upsert: true, // Create if doesn't exist
        new: true // Return updated document
      }
    );

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error('Error saving conversation:', error);
    res.status(500).json({ error: 'Failed to save conversation' });
  }
});

// POST to clear conversation messages
router.post('/conversations/:userId/clear', async (req, res) => {
  try {
    const { userId } = req.params;

    const conversation = await Conversation.findOne({ userId });
    
    if (!conversation) {
      // If no conversation exists, create an empty one
      const newConversation = new Conversation({ userId, messages: [] });
      await newConversation.save();
      return res.status(200).json({ message: 'Conversation cleared (none existed)' });
    }

    // Use the schema method we defined
    await conversation.clearMessages();
    
    res.status(200).json({ message: 'Conversation cleared successfully' });
  } catch (error) {
    console.error('Error clearing conversation:', error);
    res.status(500).json({ error: 'Failed to clear conversation' });
  }
});

// Remove this route as it's redundant with the new POST /conversations/:userId
// router.post('/conversations/:userId/messages', ...);

// Remove this route as we don't need to create new conversation documents separately
// router.post('/conversations', ...);

module.exports = router;