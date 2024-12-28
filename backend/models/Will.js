const mongoose = require('mongoose');

const WillSchema = new mongoose.Schema({
    testatorName: { type: String, required: true },
    testatorAddress: { type: String, required: true },
    executorName: { type: String, required: true },
    executorAddress: { type: String, required: true },
    beneficiaries: [
        {
            name: { type: String, required: true },
            relation: { type: String, required: true },
            share: { type: String, required: true },
        },
    ],
    specificBequests: [
        {
            item: { type: String, required: true },
            recipient: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('Will', WillSchema);