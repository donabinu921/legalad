const express = require('express');
const mongoose = require('mongoose');
const Conversation = require('../models/Conversation'); // Import the Conversation model

const router = express.Router();

// POST request to create a new conversation with messages
router.post('/conversations', async (req, res) => {
  try {
    const { userId, messages } = req.body;

    // Validate the required fields
    if (!userId || !messages) {
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
router.post('/conversations/:userId/messages', async (req, res) => {
    try {
      const { userId } = req.params;
      const { messages } = req.body;
  
      // Validate the required fields
    //   if (!Array.isArray(messages) || messages.length === 0) {
    //     return res.status(400).json({ error: 'Messages array is required and cannot be empty' });
    //   }
  
      // Find the conversation by userId and update its messages array
      const updatedConversation = await Conversation.findOneAndUpdate(
        { userId }, // Find the conversation by userId
        { $push: { messages: { $each: messages } } }, // Add multiple messages to the array
        { new: true } // Return the updated document
      );
  
      if (!updatedConversation) {
        return res.status(404).json({ error: 'Conversation not found for the given userId' });
      }
  
      res.status(200).json(updatedConversation);
    } catch (error) {
      console.error('Error updating conversation:', error);
      res.status(500).json({ error: 'An error occurred while updating the messages' });
    }
  });
  
  

  router.delete('/conversations/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find and delete the conversation by userId
      const deletedConversation = await Conversation.findOneAndDelete({ userId });
  
      if (!deletedConversation) {
        return res.status(404).json({ error: 'Conversation not found for the given userId' });
      }
  
      res.status(200).json({ message: 'Conversation deleted successfully', deletedConversation });
    } catch (error) {
      console.error('Error deleting conversation:', error);
      res.status(500).json({ error: 'An error occurred while deleting the conversation' });
    }
  });
  

module.exports = router;
