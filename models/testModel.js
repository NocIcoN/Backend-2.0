const mongoose = require('mongoose');

const choiceSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true,
        trim: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
});

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
        trim: true
    },
    choices: [choiceSchema], 
    points: {
        type: Number,
        required: true,
        min: 1 
    }
});

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: [1, 'Durasi minimal harus 1 menit']
    },
    date: {
        type: Date,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    totalQuestions: {
        type: Number,
        required: true,
        min: 1
    },
    passingScore: {
        type: Number,
        required: true
    },
    questions: [questionSchema], 
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

testSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;