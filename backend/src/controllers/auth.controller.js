// auth.controller.js
// Handles business logic for user registration and login

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// ─────────────────────────────────────────
// @function  registerUser
// @desc      Creates a new user account
// @route     POST /api/auth/register
// @access    Public
// ─────────────────────────────────────────
const registerUser = async (req, res) => {
  try {
    // Step 1: Extract user details from request body
    const { name, email, password, role, cgpa, branch } = req.body;

    // Step 2: Validate that required fields are present
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, password and role'
      });
    }

    // Step 3: Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Step 4: Hash the password before saving
    // The number 10 is the "salt rounds" - higher = more secure but slower
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Step 5: Create the new user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,  // never save plain text password
      role,
      cgpa: cgpa || null,
      branch: branch || null
    });

    // Step 6: Generate JWT token for immediate login after registration
    const token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }  // token expires in 7 days
    );

    // Step 7: Return success response with token and user info
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// ─────────────────────────────────────────
// @function  loginUser
// @desc      Authenticates user and returns JWT token
// @route     POST /api/auth/login
// @access    Public
// ─────────────────────────────────────────
const loginUser = async (req, res) => {
  try {
    // Step 1: Extract credentials from request body
    const { email, password } = req.body;

    // Step 2: Validate that both fields are present
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Step 3: Find user by email in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'  // intentionally vague for security
      });
    }

    // Step 4: Compare entered password with hashed password in database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'  // same message - don't reveal which is wrong
      });
    }

    // Step 5: Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Step 6: Return success response with token and user info
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

module.exports = { registerUser, loginUser };