const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 🔐 Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role || 'user' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// 👤 Register Controller
const registerUser = async (req, res) => {
  try {
    const { name, email = '', password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = new User({ name, email: normalizedEmail, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// 🔐 Login Controller
const loginUser = async (req, res) => {
  try {
    const { email = '', password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};