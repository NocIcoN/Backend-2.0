const Result = require('../models/resultModel');

// Get all results
exports.getAllResults = async (req, res) => {
    try {
        const results = await Result.find();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get result by ID
exports.getResultById = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create new result
exports.createResult = async (req, res) => {
    try {
        const newResult = new Result(req.body);
        const savedResult = await newResult.save();
        res.status(201).json(savedResult);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update result
exports.updateResult = async (req, res) => {
    try {
        const updatedResult = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResult) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json(updatedResult);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete result
exports.deleteResult = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        await result.remove();
        res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
