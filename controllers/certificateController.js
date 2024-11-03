const Certificate = require('../models/certificateModel');

// Get all certificates
exports.getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find();
        res.status(200).json(certificates);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get certificate by ID
exports.getCertificateById = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create new certificate
exports.createCertificate = async (req, res) => {
    const { title, user, issueDate, score } = req.body;
    try {
        const newCertificate = new Certificate({ title, user, issueDate, score });
        await newCertificate.save();
        res.status(201).json(newCertificate);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update certificate
exports.updateCertificate = async (req, res) => {
    try {
        const updatedCertificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCertificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.status(200).json(updatedCertificate);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete certificate
exports.deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        await certificate.remove();
        res.status(200).json({ message: 'Certificate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
