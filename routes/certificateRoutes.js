const express = require('express');
const router = express.Router();
const { getAllCertificates, getCertificateById, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/certificates:
 *   get:
 *     summary: Get all certificates
 *     tags: [Certificates]
 *     responses:
 *       200:
 *         description: A list of all certificates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certificate'
 *       500:
 *         description: Server Error
 */

// Get all certificates (admin only)
router.get('/', protect, admin, getAllCertificates);

/**
 * @swagger
 * /api/certificates/{id}:
 *   get:
 *     summary: Get certificate by ID
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Certificate ID
 *     responses:
 *       200:
 *         description: Certificate data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Certificate not found
 *       500:
 *         description: Server Error
 */

// Get a single certificate by ID (admin or user)
router.get('/:id', protect, getCertificateById);

/**
 * @swagger
 * /api/certificates:
 *   post:
 *     summary: Create a new certificate
 *     tags: [Certificates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certificate'
 *     responses:
 *       201:
 *         description: Certificate created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       500:
 *         description: Server Error
 */

// Create a new certificate (admin only)
router.post('/', protect, admin, createCertificate);

/**
 * @swagger
 * /api/certificates/{id}:
 *   put:
 *     summary: Update a certificate by ID
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Certificate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certificate'
 *     responses:
 *       200:
 *         description: Certificate updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       404:
 *         description: Certificate not found
 *       500:
 *         description: Server Error
 */

// Update a certificate (admin only)
router.put('/:id', protect, admin, updateCertificate);

/**
 * @swagger
 * /api/certificates/{id}:
 *   delete:
 *     summary: Delete certificate by ID
 *     tags: [Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Certificate ID
 *     responses:
 *       200:
 *         description: Certificate deleted successfully
 *       404:
 *         description: Certificate not found
 *       500:
 *         description: Server Error
 */

// Delete a certificate (admin only)
router.delete('/:id', protect, admin, deleteCertificate);

/**
 * @swagger
 * components:
 *   schemas:
 *     Certificate:
 *       type: object
 *       required:
 *         - user
 *         - result
 *         - certificateLink
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the certificate
 *         user:
 *           type: string
 *           description: The ID of the user associated with the certificate
 *         result:
 *           type: string
 *           description: The ID of the test result associated with the certificate
 *         certificateLink:
 *           type: string
 *           description: The URL link to the certificate file
 *         issuedDate:
 *           type: string
 *           format: date
 *           description: The date the certificate was issued
 *         expirationDate:
 *           type: string
 *           format: date
 *           description: The expiration date of the certificate (optional)
 *         status:
 *           type: string
 *           enum: [valid, revoked]
 *           description: The status of the certificate
 *       example:
 *         id: 609c91282e1d4c23b85f1d2b
 *         user: 609b9b6c87f01b3edc58a2c4
 *         result: 609b9b6c87f01b3edc58a2d1
 *         certificateLink: "http://example.com/certificate.pdf"
 *         issuedDate: "2023-05-01"
 *         expirationDate: "2025-12-31"
 *         status: "valid"
 */

module.exports = router;
