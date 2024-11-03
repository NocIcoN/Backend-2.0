const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true
    },
    testDate: {
        type: Date,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
