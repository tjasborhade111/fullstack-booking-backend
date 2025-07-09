const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user"); // Make sure filename is 'User.js'
const bcrypt = require("bcrypt");

// POST /api/auth — Register new user
router.post("/", async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create and save new user
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
