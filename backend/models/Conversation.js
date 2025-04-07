const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true 
  },
  content: {
    type: String,
    required: true, 
    trim: true  
  },
  timestamp: {
    type: Date,
    default: Date.now,  
    required: true
  }
}, { _id: true });  

 
const ConversationSchema = new mongoose.Schema({
  userId: {
    type: String,  
    required: true,
    index: true  
  },
  messages: {
    type: [MessageSchema],
    default: []  
  },
  lastUpdated: {
    type: Date,
    default: Date.now  
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true }  
});


ConversationSchema.virtual('messageCount').get(function() {
  return this.messages.length;
});

ConversationSchema.methods.clearMessages = async function() {
  this.messages = [];
  this.lastUpdated = Date.now();
  return await this.save();
};

ConversationSchema.index({ userId: 1, lastUpdated: -1 });

module.exports = mongoose.model('Conversation', ConversationSchema);