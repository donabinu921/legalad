const mongoose = require('mongoose');

// Define the schema for the message object
const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true // Make role required
  },
  content: {
    type: String,
    required: true, // Make content required
    trim: true // Remove unnecessary whitespace
  },
  timestamp: {
    type: Date,
    default: Date.now, // Add timestamp for each message
    required: true
  }
}, { _id: true }); // Ensure each message has its own _id

// Define the schema for the conversation object
const ConversationSchema = new mongoose.Schema({
  userId: {
    type: String, // Changed to String to match your localStorage USER
    required: true,
    index: true // Add index for faster queries by userId
  },
  messages: {
    type: [MessageSchema],
    default: [] // Ensure messages array is initialized
  },
  lastUpdated: {
    type: Date,
    default: Date.now // Track last update time
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true } // Include virtuals when converting to JSON
});

// Add virtual to get message count
ConversationSchema.virtual('messageCount').get(function() {
  return this.messages.length;
});

// Add method to clear messages
ConversationSchema.methods.clearMessages = async function() {
  this.messages = [];
  this.lastUpdated = Date.now();
  return await this.save();
};

// Add index for better query performance
ConversationSchema.index({ userId: 1, lastUpdated: -1 });

module.exports = mongoose.model('Conversation', ConversationSchema);