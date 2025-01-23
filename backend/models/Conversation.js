const mongoose = require('mongoose');

// Define the schema for the message object
const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'], // Restrict role to specific values
  },
  content: {
    type: String,
  },
});

// Define the schema for the conversation object
const ConversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a user
    ref: 'User', // Name of the User model (if you have one)
    required: true,
  },
  messages: {
    type: [MessageSchema], // Array of message objects
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create the model
module.exports = mongoose.model('Conversation', ConversationSchema);
