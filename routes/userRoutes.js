const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, deleteUser, getUserProfile, updateUserProfile } = require('../controllers/userController'); 
const { protect, admin } = require('../middleware/authMiddleware');

// Get all users (admin only)
router.get('/', protect, admin, getAllUsers);

// Get specific user by ID (admin or user)
router.get('/:id', protect, getUserById);

// Update user details (admin or user)
router.put('/:id', protect, updateUserProfile); 

// Delete user (admin only)
router.delete('/:id', protect, admin, deleteUser);

// Get logged-in user profile
router.get('/profile', protect, getUserProfile);

module.exports = router;