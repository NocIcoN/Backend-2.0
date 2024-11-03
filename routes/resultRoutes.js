const express = require('express');
const router = express.Router();
const { getResultById, createResult, updateResult, deleteResult, getAllResults } = require('../controllers/resultController'); // Pastikan semua fungsi ini ada

/**
 * @swagger
 * /api/results:
 *   get:
 *     summary: Get all results
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: A list of all results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 *       500:
 *         description: Server Error
 */

// Get all results
router.get('/', getAllResults);

/**
 * @swagger
 * /api/results/{id}:
 *   get:
 *     summary: Get result by ID
 *     tags: [Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Result ID
 *     responses:
 *       200:
 *         description: Result data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       404:
 *         description: Result not found
 *       500:
 *         description: Server Error
 */

// Get result by ID
router.get('/:id', getResultById);

/**
 * @swagger
 * /api/results:
 *   post:
 *     summary: Create a new result
 *     tags: [Results]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Result'
 *     responses:
 *       201:
 *         description: Result created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       500:
 *         description: Server Error
 */

// Create new result
router.post('/', createResult);

/**
 * @swagger
 * /api/results/{id}:
 *   put:
 *     summary: Update result by ID
 *     tags: [Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Result ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Result'
 *     responses:
 *       200:
 *         description: Result updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       404:
 *         description: Result not found
 *       500:
 *         description: Server Error
 */

// Update result by ID
router.put('/:id', updateResult);

/**
 * @swagger
 * /api/results/{id}:
 *   delete:
 *     summary: Delete result by ID
 *     tags: [Results]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Result ID
 *     responses:
 *       200:
 *         description: Result deleted successfully
 *       404:
 *         description: Result not found
 *       500:
 *         description: Server Error
 */

// Delete result by ID
router.delete('/:id', deleteResult);

/**
 * @swagger
 * components:
 *   schemas:
 *     Result:
 *       type: object
 *       required:
 *         - user
 *         - score
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the result
 *         user:
 *           type: string
 *           description: User ID associated with the result
 *         score:
 *           type: number
 *           description: The score of the user
 *         date:
 *           type: string
 *           format: date
 *           description: The date when the result was issued
 *       example:
 *         id: 612c99f02e4f4a23cbd7e4e1
 *         user: 64c22bd02f002d3148fbb93e
 *         score: 85
 *         date: 2024-10-04
 */

module.exports = router;
