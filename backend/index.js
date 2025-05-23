const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat.js');
// const chat2Routes = require('./routes/chat2.js'); 

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', chatRoutes);
app.use('/api', authRoutes);
// app.use('/api', chat2Routes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect("mongodb+srv://crispyfingers:crispyDB@cluster0.k22ya.mongodb.net/legalAD?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));
