const express = require('express');
const User = require('../models/userModel');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.get('/users', adminMiddleware, async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
