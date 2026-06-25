// auth.routes.js
// Handles all authentication-related routes: register, login, and test

const express = require('express');
const router = express.Router();

// Import authentication controller functions
const { registerUser, loginUser } = require('../controllers/auth.controller');

// ─────────────────────────────────────────
// @route   POST /api/auth/register
// @desc    Register a new user (student/admin/recruiter)
// @access  Public (no token needed)
// ─────────────────────────────────────────
router.post('/register', registerUser);

// ─────────────────────────────────────────
// @route   POST /api/auth/login
// @desc    Login existing user, returns JWT token
// @access  Public (no token needed)
// ─────────────────────────────────────────
router.post('/login', loginUser);

// ─────────────────────────────────────────
// @route   GET /api/auth/test
// @desc    Test route to confirm auth routes are working
// @access  Public
// ─────────────────────────────────────────
router.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Auth routes are working correctly'
  });
});

module.exports = router;