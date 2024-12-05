const mongoose = require('mongoose');

const choiceSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true,
        trim: true
    },
    isCorrect: {
        type: Boolean,
        default: false // Menandakan apakah opsi ini adalah jawaban yang benar
    }
});

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
        trim: true
    },
    choices: [choiceSchema], // Array dari pilihan, setiap pilihan memiliki opsi dan penanda benar/salah
    points: {
        type: Number,
        required: true,
        min: 1 // Setiap soal harus memiliki nilai/skor
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
    questions: [questionSchema], // Array dari soal-soal pilihan ganda
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
