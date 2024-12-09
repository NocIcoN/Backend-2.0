const express = require('express');
const router = express.Router();
const { getResultById, createResult, updateResult, deleteResult, getAllResults } = require('../controllers/resultController');

// Get all results
router.get('/', getAllResults);

// Get result by ID
router.get('/:id', getResultById);

// Create new result
router.post('/', createResult);

// Update result by ID
router.put('/:id', updateResult);

// Delete result by ID
router.delete('/:id', deleteResult);

module.exports = router;