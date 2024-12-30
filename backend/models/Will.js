const mongoose = require('mongoose');

const WillSchema = new mongoose.Schema({
    testatorName: { type: String, required: true },
    testatorAddress: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    aadhaarNumber: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    spouseName: { type: String },
    hasChildren: { type: String, required: true },
    children: [{
        name: { type: String, required: true },
        dateOfBirth: { type: Date, required: true },
    }],
    parents: {
        father: { type: String, required: true },
        mother: { type: String, required: true },
    },
    hasSiblings: { type: String, required: true },
    siblings: [{
        name: { type: String, required: true },
        relation: { type: String, required: true },
    }],
    executorName: { type: String, required: true },
    executorAddress: { type: String, required: true },
    alternateExecutorName: { type: String },
    alternateExecutorAddress: { type: String },
    beneficiaries: [{
        name: { type: String, required: true },
        relation: { type: String, required: true },
        share: { type: String, required: true },
    }],
    specificBequests: [{
        item: { type: String, required: true },
        recipient: { type: String, required: true },
    }],
    debts: [{
        institution: { type: String, required: true },
        amount: { type: Number, required: true },
        instructions: { type: String, required: true },
    }],
    guardianshipDetails: { type: String },
    witnesses: [{
        name: { type: String, required: true },
        address: { type: String, required: true },
    }],
    funeralPreferences: { type: String },
    charitableDonations: [{
        organization: { type: String},
        amount: { type: Number},
    }],
    dateOfWillCreation: {
        type: Date,
        default: Date.now // This will automatically set the current date and time when a new document is created
    }
}, {
    // Setting default values for fields that can be empty arrays
    timestamps: true,
    // Custom validations for 'hasSiblings' and 'children'
    validate: [
        {
            validator: function () {
                // If maritalStatus is 'married', spouseName must not be empty
                if (this.maritalStatus === 'married' && this.spouseName === '') {
                    return false;
                }
                return true;
            },
            message: 'If maritalStatus is "married", spouseName must not be empty.',
        },
        {
            validator: function () {
                // If hasSiblings is 'yes', siblings array must not be empty
                if (this.hasSiblings === 'yes' && this.siblings.length === 0) {
                    return false;
                }
                return true;
            },
            message: 'If hasSiblings is "yes", siblings array must not be empty.',
        },
        {
            validator: function () {
                // If hasChildren is 'yes', children array must not be empty
                if (this.hasChildren === 'yes' && this.children.length === 0) {
                    return false;
                }
                return true;
            },
            message: 'If hasChildren is "yes", children array must not be empty.',
        },
    ]
});

module.exports = mongoose.model('Will', WillSchema);
