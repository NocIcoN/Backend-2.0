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

exports.submitTest  = async (req, res) => {
    try {
        const { id } = req.params; 
        const { answers } = req.body;

        if (!answers || typeof answers !== 'object') {
            return res.status(400).json({ message: 'Invalid answers format.' });
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
            if (answers[index] === question.correctAnswer) {
                score += 1; 
            }
        });

        // Simpan hasil ke database jika diperlukan
        const result = await TestResult.create({
            user: req.user._id,
            test: id,
            score,
            totalQuestions: test.questions.length,
        });

        return res.status(200).json({ message: 'Test submitted successfully.', result });
    } catch (error) {
        console.error('Error in submitTest:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }

};