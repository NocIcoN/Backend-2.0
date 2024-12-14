const Result = require('../models/resultModel');

exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.find().populate('user', 'name email').populate('schedule', 'title date');
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching results:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }

};

exports.getResultById = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id).populate('user', 'name email').populate('schedule', 'title date');
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching result:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createResult = async (req, res) => {
    try {
        const { user, schedule, score, certificateLink } = req.body;
        const passed = score >= 70;
        const newResult = new Result({
            user,
            schedule,
            score,
            passed,
            certificateLink
        });

        const savedResult = await newResult.save();
        res.status(201).json({ message: 'Result created successfully', result: savedResult });
    } catch (error) {
        console.error('Error creating result:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateResult = async (req, res) => {
    try {
        const { score } = req.body;

        if (score !== undefined) {
            req.body.passed = score >= 70; 
        }

        const updatedResult = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResult) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json({ message: 'Result updated successfully', result: updatedResult });
    } catch (error) {
        console.error('Error updating result:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }

};

exports.deleteResult = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        await result.remove();
        res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
        console.error('Error deleting result:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
