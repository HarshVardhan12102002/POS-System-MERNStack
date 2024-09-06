const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cors = require("cors"); // Add this line
const User = require("../models/User.js");

router.post("/login", cors(), async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        status: "error",
        messages: "Please enter all fields",
      });
    }

    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (!user) {
      return res.status(404).json({
        status: "error",
        messages: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({
        status: "error",
        messages: "Invalid credentials",
      });
    }

    // Successful login
    res.status(200).json({
      status: "success",
      messages: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      messages: "Internal Server Error",
    });
  }
});

module.exports = router;
