const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser, getUserProfile, updateUserProfile } = require('../controllers/userController'); 
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server Error
 */

// Get all users (admin only)
router.get('/', protect, admin, getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */

// Get specific user by ID (admin or user)
router.get('/:id', protect, getUserById);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               username: johnupdated
 *               email: johnupdated@example.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */

// Update user details (admin or user)
router.put('/:id', protect, updateUserProfile); 

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */

// Delete user (admin only)
router.delete('/:id', protect, admin, deleteUser);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */

// Get logged-in user profile
router.get('/profile', protect, getUserProfile);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the user
 *           example: 609c0b8f4f1a2c35b4f5954d
 *         username:
 *           type: string
 *           description: Username of the user (must be unique)
 *           example: john_doe
 *         email:
 *           type: string
 *           description: Email of the user (must be unique)
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           description: Hashed password of the user
 *           example: $2a$10$CQI5Lrr1C0eG.gvvh/ZVruWciAYF4Mlln5SzfMEXBVEcvBhFf.KRa
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Role of the user (either 'user' or 'admin')
 *           default: user
 *           example: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created
 *           example: 2023-09-14T09:23:47.000Z
 */

module.exports = router;
