const express = require('express');
const router = express.Router();
const { getAllSchedules, createSchedule, updateSchedule, deleteSchedule } = require('../controllers/scheduleController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all schedules (user or admin)
router.get('/', protect, getAllSchedules);

// Create new schedule (admin only)
router.post('/', protect, admin, createSchedule);

// Update schedule (admin only)
router.put('/:id', protect, admin, updateSchedule);

// Delete schedule (admin only)
router.delete('/:id', protect, admin, deleteSchedule);

module.exports = router;