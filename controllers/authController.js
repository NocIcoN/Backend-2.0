const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      return res.status(400).json({ message: 'User sudah terdaftar' });
    }
  
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
};
  
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = createToken(user);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role, 
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// LogoutController
const logoutUser = (req, res) => {
    res.status(200).json({ message: 'User logged out successfully' });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};
