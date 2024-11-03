const express = require('express');
const { protect } = require('../middleware/auth'); // Middleware autentikasi
const admin = require('../middleware/admin'); // Middleware role admin
const router = express.Router();

router.get('/admin-only-endpoint', protect, admin, (req, res) => {
  res.json({ message: 'Selamat datang, admin!' });
});

module.exports = router;
