const express = require('express');
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation');

const router = express.Router();

router.get('/conversations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const conversation = await Conversation.findOne({ userId });
    
    if (!conversation) {
      return res.status(200).json([]);
    }
    
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

router.post('/conversations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Messages must be provided as an array' 
      });
    }

    const conversation = await Conversation.findOneAndUpdate(
      { userId },
      { 
        messages,
        lastUpdated: Date.now()
      },
      { 
        upsert: true,  
        new: true  
      }
    );

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error('Error saving conversation:', error);
    res.status(500).json({ error: 'Failed to save conversation' });
  }
});

router.post('/conversations/:userId/clear', async (req, res) => {
  try {
    const { userId } = req.params;

    const conversation = await Conversation.findOne({ userId });
    
    if (!conversation) {
   
      const newConversation = new Conversation({ userId, messages: [] });
      await newConversation.save();
      return res.status(200).json({ message: 'Conversation cleared (none existed)' });
    }

 
    await conversation.clearMessages();
    
    res.status(200).json({ message: 'Conversation cleared successfully' });
  } catch (error) {
    console.error('Error clearing conversation:', error);
    res.status(500).json({ error: 'Failed to clear conversation' });
  }
});

 

module.exports = router;