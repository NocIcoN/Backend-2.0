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
        const testId = req.params.id; // ID test dari URL
        const { answers } = req.body; // Jawaban dari user

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ 
                success: false, 
                message: "Answers are required and must be an array" 
            });
        }

        // Cari test berdasarkan ID
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ 
                success: false, 
                message: "Test not found" 
            });
        }

        // Grading logika
        let score = 0;
        test.questions.forEach((question, index) => {
            const userAnswer = answers[index];
            if (question.choices.some(choice => choice.isCorrect && choice.option === userAnswer)) {
                score += question.points;
            }
        });

        // Simpan hasil ke database jika diperlukan
        const result = {
            user: req.user.id, // ID pengguna yang mengerjakan
            test: testId,
            score,
            passed: score >= test.passingScore,
        };

        // Simpan hasil di collection 'results' (opsional)
        await Result.create(result);

        res.status(200).json({
            success: true,
            message: "Test submitted successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in takeTest:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Failed to submit test", 
            error: error.message 
        });
    }
};