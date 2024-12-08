const Test = require('../models/testModel'); 

exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json({
            success: true,
            data: tests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mendapatkan daftar tes',
            error: error.message
        });
    }
};

exports.getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);

        if (!test) {
            return res.status(404).json({
                success: false,
                message: 'Tes tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            data: test
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mendapatkan tes',
            error: error.message
        });
    }
};

exports.createTest = async (req, res) => {
    try {
        const { title, description, duration, date, totalQuestions, passingScore, questions } = req.body;

        const newTest = new Test({
            title, description, duration, date, totalQuestions, passingScore, questions
        });

        await newTest.save();

        res.status(201).json({
            success: true,
            message: 'Tes berhasil dibuat',
            data: newTest
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal membuat tes',
            error: error.message
        });
    }
};

exports.updateTest = async (req, res) => {
    try {
        const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTest) {
            return res.status(404).json({
                success: false,
                message: 'Tes tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tes berhasil diperbarui',
            data: updatedTest
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui tes',
            error: error.message
        });
    }
};

exports.deleteTest = async (req, res) => {
    try {
        const deletedTest = await Test.findByIdAndDelete(req.params.id);

        if (!deletedTest) {
            return res.status(404).json({
                success: false,
                message: 'Tes tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tes berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus tes',
            error: error.message
        });
    }
};

exports.testTaking = async (req, res) => {
    try {
        const testId = req.params.id;
        const userId = req.user.id;

        const test = await Test.findById(testId).populate('questions.choices');

        if (!test) {
            return res.status(404).json({
                success: false,
                message: 'Tes tidak ditemukan'
            });
        }

        const userAnswers = req.body.answers;

        let correctAnswers = 0;
        const userResponses = userAnswers.map((answer, index) => {
            const question = test.questions[index];
            const userChoice = question.choices.find(choice => choice.option === answer.option);

            if (userChoice && userChoice.isCorrect) {
                correctAnswers++;
            }

            return {
                questionText: question.questionText,
                userAnswer: answer.option,
                isCorrect: userChoice ? userChoice.isCorrect : false
            };
        });

        const score = (correctAnswers / test.totalQuestions) * test.passingScore;

        res.status(200).json({
            success: true,
            message: 'Tes berhasil diselesaikan',
            score: score,
            responses: userResponses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat melakukan penilaian',
            error: error.message
        });
    }
};
