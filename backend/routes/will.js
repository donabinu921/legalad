const express = require('express');
const Will = require('../Models/Will');

const router = express.Router();

// Create a new will
router.post('/will', async (req, res) => {
    try {
        const willData = req.body;
        const newWill = new Will(willData);
        const savedWill = await newWill.save();
        res.status(201).json(savedWill);
    } catch (error) {
        console.error('Error saving the will:', error);
        res.status(500).json({ error: 'Failed to save the will' });
    }
});

module.exports = router;