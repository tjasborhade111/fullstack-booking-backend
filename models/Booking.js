const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  name: String,
  age: Number,
  timing: String,
  category: String,
  provider: String,
  symptoms: String,    // Doctor
  subject: String,     // Teacher
  mode: String,        // Teacher
  serviceType: String, // Salon
  stylist: String,     // Salon
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Prevent OverwriteModelError
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

module.exports = Booking;
