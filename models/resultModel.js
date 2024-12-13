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
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    passed: {
        type: Boolean,
        required: true
    },
    certificateLink: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: 'Tautan sertifikat tidak valid!'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

resultSchema.virtual('userName', {
    ref: 'User',
    localField: 'user',
    foreignField: '_id',
    justOne: true
});

resultSchema.pre('save', function (next) {
    this.passed = this.score >= 70; // Example passing condition
    next();
});

resultSchema.index({ user: 1, schedule: 1 });

module.exports = mongoose.model('Result', resultSchema);
