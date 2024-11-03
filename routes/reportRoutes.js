const express = require('express');
const router = express.Router();
const { getReports, getReportById, createReport, updateReport, deleteReport } = require('../controllers/reportController'); // Pastikan semua fungsi ini ada di controller

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get all reports
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: A list of all reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 *       500:
 *         description: Server Error
 */

// Get all reports
router.get('/', getReports);

/**
 * @swagger
 * /api/reports/{id}:
 *   get:
 *     summary: Get report by ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Report ID
 *     responses:
 *       200:
 *         description: Report data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server Error
 */

// Get report by ID
router.get('/:id', getReportById);

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Create a new report
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       201:
 *         description: Report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       500:
 *         description: Server Error
 */

// Create new report
router.post('/', createReport);

/**
 * @swagger
 * /api/reports/{id}:
 *   put:
 *     summary: Update report by ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       200:
 *         description: Report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server Error
 */

// Update report by ID
router.put('/:id', updateReport);

/**
 * @swagger
 * /api/reports/{id}:
 *   delete:
 *     summary: Delete report by ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Report ID
 *     responses:
 *       200:
 *         description: Report deleted successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server Error
 */

// Delete report by ID
router.delete('/:id', deleteReport);

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the report
 *         title:
 *           type: string
 *           description: The title of the report
 *         description:
 *           type: string
 *           description: A brief description of the report
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the report was created
 *       example:
 *         id: 612c99f02e4f4a23cbd7e4e1
 *         title: Report on TOEFL Test Progress
 *         description: Detailed report about the TOEFL test progress for users
 *         createdAt: 2024-10-04T12:00:00Z
 */

module.exports = router;
