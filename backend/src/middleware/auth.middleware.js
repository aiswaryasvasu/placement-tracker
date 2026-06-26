// auth.middleware.js
// Protects routes by verifying JWT tokens on every request
// Any route that requires login must use this middleware first

const jwt = require('jsonwebtoken');

// ─────────────────────────────────────────
// @middleware  protect
// @desc        Verifies JWT token from Authorization header
//              Attaches decoded user info to req.user
// @usage       router.get('/profile', protect, getProfile)
// ─────────────────────────────────────────
const protect = (req, res, next) => {
  try {
    // Step 1: Get the Authorization header from the request
    // Expected format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const authHeader = req.headers.authorization;

    // Step 2: Check if Authorization header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Step 3: Extract the token by removing "Bearer " prefix
    // "Bearer abc123" → "abc123"
    const token = authHeader.split(' ')[1];

    // Step 4: Verify the token using JWT_SECRET from .env
    // This checks: is the token valid? has it expired? was it tampered with?
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 5: Attach decoded user info to req.user
    // Now any route after this middleware can access req.user.userId and req.user.role
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    // Step 6: Call next() to pass control to the next middleware or route handler
    next();

  } catch (error) {
    // If jwt.verify() throws, the token is either invalid or expired
    console.error('Auth middleware error:', error.message);

    return res.status(401).json({
      success: false,
      message: 'Access denied. Token is invalid or expired.'
    });
  }
};

module.exports = { protect };