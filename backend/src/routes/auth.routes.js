// auth.routes.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// controllers
const { registerUser, loginUser } = require("../controllers/auth.controller");

// =========================
// AUTH ROUTES
// =========================
router.post("/register", registerUser);
router.post("/login", loginUser);

// =========================
// GET LOGGED-IN USER
// =========================
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No authorization token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Profile fetch error:", error.message);
    res.status(401).json({
      success: false,
      message: "Session expired or invalid token.",
    });
  }
});

// =========================
// TEST NOTIFICATION (DEBUG)
// =========================
router.get("/test-notify", (req, res) => {
  const io = req.app.get("io");

  const userId = "6a42c95eccff5377af40510e";

  io.to(userId).emit("notification", {
    message: "🎉 You are shortlisted for TCS interview!",
  });

  res.json({
    success: true,
    message: "Test notification sent",
  });
});

// =========================
// SEND NOTIFICATION (ADMIN)
// =========================
router.post("/send-notification", (req, res) => {
  const io = req.app.get("io");
  const { userId, message } = req.body;

  console.log("Sending to userId:", userId);

  io.to(userId).emit("notification", { message });

  res.json({ success: true });
});
 

  res.json({
    success: true,
    message: "Notification sent successfully",
  });


// =========================
// TEST ROUTE
// =========================
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes working correctly",
  });
});

module.exports = router;