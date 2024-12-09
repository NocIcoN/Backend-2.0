const express = require('express');
const router = express.Router();
const { getReports, getReportById, createReport, updateReport, deleteReport } = require('../controllers/reportController'); // Pastikan semua fungsi ini ada di controller

// Get all reports
router.get('/', getReports);

// Get report by ID
router.get('/:id', getReportById);

// Create new report
router.post('/', createReport);

// Update report by ID
router.put('/:id', updateReport);

// Delete report by ID
router.delete('/:id', deleteReport);

module.exports = router;