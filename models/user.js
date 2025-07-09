const mongoose = require("mongoose");
const Joi = require("joi");

// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

// Mongoose model
const User = mongoose.model("User", userSchema);

// Joi validation
function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
}

// Export properly
module.exports = { User, validate };
