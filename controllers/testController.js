const Test = require('../models/testModel'); 
const Result = require('../models/resultModel');

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

exports.submitTest = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { userId } = req.user;
        const { testId, answers } = req.body;

        // Fetch the test details
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        // Calculate the score
        let score = 0;
        test.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        // Determine pass/fail
        const passingScore = test.passingScore || Math.ceil(test.questions.length * 0.7);
        const passed = score >= passingScore;

        const newResult = new Result({
            user: userId,
            schedule: test.schedule || null,
            testTitle: test.title,
            testDate: new Date(),
            score: score,
            passed: passed,
            certificateLink: passed
                ? `https://my-service.up.railway.app/certificates/${userId}-${testId}-certificate.pdf`
                : null
        });

        const savedResult = await newResult.save();

        res.status(201).json({
            message: 'Test submitted successfully',
            result: savedResult
        });
    } catch (error) {
        console.error('Error in submitTest:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};