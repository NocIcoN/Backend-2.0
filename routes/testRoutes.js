const express = require('express');
const router = express.Router();
const { getAllTests, getTestById, createTest, updateTest, deleteTest, testTaking } = require('../controllers/testController');
// const { protect, admin } = require('../middleware/authMiddleware');

// Get all tests
router.get('/', /*protect,*/ getAllTests);

// Get specific test by ID
router.get('/:id', /*protect,*/ getTestById); 

// Route to take test (user only)
router.post('/:id/take', /*protect,*/ testTaking);

// Create new test
router.post('/', /*protect, admin,*/ createTest);

// Update test
router.put('/:id', /*protect, admin,*/ updateTest);

// Delete test
router.delete('/:id', /*protect, admin,*/ deleteTest);

module.exports = router;