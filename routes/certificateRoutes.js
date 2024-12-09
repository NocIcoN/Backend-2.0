const express = require('express');
const router = express.Router();
const { getAllCertificates, getCertificateById, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all certificates (admin only)
router.get('/', protect, admin, getAllCertificates);

// Get a single certificate by ID (admin or user)
router.get('/:id', protect, getCertificateById);

// Create a new certificate (admin only)
router.post('/', protect, admin, createCertificate);

// Update a certificate (admin only)
router.put('/:id', protect, admin, updateCertificate);

// Delete a certificate (admin only)
router.delete('/:id', protect, admin, deleteCertificate);

module.exports = router;