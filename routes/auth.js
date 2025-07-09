const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/auth
router.post("/", async (req, res) => {
  try {
    // Validate input
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid email or password" });

    // Check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(401).send({ message: "Invalid email or password" });

    // Create JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role }, // include role in token
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send response
    res.status(200).send({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role // include role in frontend
      }
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Joi validation
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
