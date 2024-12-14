const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true
    },
    testTitle: {
        type: String,
        required: true
    },
    testDate: {
        type: Date,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    passed: {
        type: Boolean,
        required: true
    },
    certificateLink: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Result', resultSchema);