const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result',
        required: true
    },
    certificateLink: {
        type: String,
        required: true
    },
    issuedDate: {
        type: Date,
        default: Date.now
    },
    expirationDate: {
        type: Date,
        required: false 
    },
    status: {
        type: String,
        enum: ['valid', 'revoked'],
        default: 'valid'
    }
});

module.exports = mongoose.model('Certificate', certificateSchema);
