const express = require('express');
const router = express.Router();
const { getAllSchedules, createSchedule, updateSchedule, deleteSchedule } = require('../controllers/scheduleController');
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedules]
 *     responses:
 *       200:
 *         description: A list of all schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Schedule'
 *       500:
 *         description: Server Error
 */

// Get all schedules (user or admin)
router.get('/', protect, getAllSchedules);

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Create a new schedule (Admin only)
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       500:
 *         description: Server Error
 */

// Create new schedule (admin only)
router.post('/', protect, admin, createSchedule);

/**
 * @swagger
 * /api/schedules/{id}:
 *   put:
 *     summary: Update a schedule by ID (Admin only)
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server Error
 */

// Update schedule (admin only)
router.put('/:id', protect, admin, updateSchedule);

/**
 * @swagger
 * /api/schedules/{id}:
 *   delete:
 *     summary: Delete a schedule by ID (Admin only)
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Schedule ID
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 *       500:
 *         description: Server Error
 */

// Delete schedule (admin only)
router.delete('/:id', protect, admin, deleteSchedule);

/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       required:
 *         - date
 *         - time
 *         - exam
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the schedule
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the exam schedule
 *         time:
 *           type: string
 *           format: time
 *           description: The time of the exam schedule
 *         exam:
 *           type: string
 *           description: The name of the exam
 *       example:
 *         id: 612c99f02e4f4a23cbd7e4e2
 *         date: 2024-10-05
 *         time: 09:00
 *         exam: TOEFL Test
 */

module.exports = router;
