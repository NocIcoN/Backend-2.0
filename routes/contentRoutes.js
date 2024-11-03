const express = require('express');
const router = express.Router();
const { getAllContents, getContentById, createContent, updateContent, deleteContent } = require('../controllers/contentController'); 
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/contents:
 *   get:
 *     summary: Get all contents
 *     tags: [Contents]
 *     responses:
 *       200:
 *         description: A list of all contents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *       500:
 *         description: Server Error
 */

// Get all content (Admin only)
router.get('/', protect, admin, getAllContents);

/**
 * @swagger
 * /api/contents/{id}:
 *   get:
 *     summary: Get content by ID
 *     tags: [Contents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Content ID
 *     responses:
 *       200:
 *         description: Content data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Content not found
 *       500:
 *         description: Server Error
 */

// Get specific content by ID (Admin only)
router.get('/:id', protect, admin, getContentById);

/**
 * @swagger
 * /api/contents:
 *   post:
 *     summary: Create a new content
 *     tags: [Contents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       201:
 *         description: Content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       500:
 *         description: Server Error
 */

// Create new content (Admin only)
router.post('/', protect, admin, createContent);

/**
 * @swagger
 * /api/contents/{id}:
 *   put:
 *     summary: Update content by ID
 *     tags: [Contents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       200:
 *         description: Content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Content not found
 *       500:
 *         description: Server Error
 */

// Update content (Admin only)
router.put('/:id', protect, admin, updateContent);

/**
 * @swagger
 * /api/contents/{id}:
 *   delete:
 *     summary: Delete content by ID
 *     tags: [Contents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Content ID
 *     responses:
 *       200:
 *         description: Content deleted successfully
 *       404:
 *         description: Content not found
 *       500:
 *         description: Server Error
 */

// Delete content (Admin only)
router.delete('/:id', protect, admin, deleteContent);

/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the content
 *         title:
 *           type: string
 *           description: Title of the content
 *         description:
 *           type: string
 *           description: Description of the content
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the content was created
 *       example:
 *         id: 612c99f02e4f4a23cbd7e4e1
 *         title: TOEFL Study Material
 *         description: Study material for TOEFL preparation
 *         createdAt: 2024-10-04T12:00:00Z
 */

module.exports = router;
