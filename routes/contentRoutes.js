const express = require('express');
const router = express.Router();
const { getAllContents, getContentById, createContent, updateContent, deleteContent } = require('../controllers/contentController'); 
const { protect, admin } = require('../middleware/authMiddleware');

// Get all content
router.get('/', protect, getAllContents);

// Get specific content by ID (Admin only)
router.get('/:id', protect, admin, getContentById);

// Create new content (Admin only)
router.post('/', protect, admin, createContent);

// Update content (Admin only)
router.put('/:id', protect, admin, updateContent);

// Delete content (Admin only)
router.delete('/:id', protect, admin, deleteContent);

module.exports = router;