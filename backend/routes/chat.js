const express = require('express');
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation'); // Import the Conversation model

const router = express.Router();

// POST request to create a new conversation with messages
router.post('/conversations', async (req, res) => {
  try {
    const { userId, messages } = req.body;

    // Validate the required fields
    if (!userId || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'userId and messages are required, and messages must be an array' });
    }

    // Create a new conversation
    const newConversation = new Conversation({ userId, messages });
    await newConversation.save();

    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the conversation' });
  }
});

router.get('/conversations/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find all conversations for the given userId
      const conversations = await Conversation.find({ userId });
  
      if (!conversations || conversations.length === 0) {
        return res.status(404).json({ error: 'No conversations found for this user' });
      }
  
      res.status(200).json(conversations);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'An error occurred while fetching messages' });
    }
  });

  
// POST request to add a message to an existing conversation
router.post('/conversations/:conversationId/messages', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { role, content } = req.body;

    // Validate the required fields
    if (!role || !content) {
      return res.status(400).json({ error: 'Both role and content are required' });
    }

    // Find the conversation and update it by adding the new message
    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { $push: { messages: { role, content } } }, // Add the new message
      { new: true } // Return the updated document
    );

    if (!updatedConversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.status(200).json(updatedConversation);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the message' });
  }
});

module.exports = router;
