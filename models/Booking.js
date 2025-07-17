const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true }, // Person booking
  name: { type: String, required: true },     // Person being booked
  age: { type: Number },

  date: { type: String, required: true },     // Appointment date
  time: { type: String, required: true },     // Appointment time

  bookedAt: { type: Date, default: Date.now }, // Booking timestamp

  provider: { type: String, required: true },  // e.g. Dr. Tejas
  category: { type: String, required: true },  // doctor | teacher | salon

  // Optional fields
  symptoms: String,   // Doctor
  subject: String,    // Teacher
  mode: String,       // Teacher
  stylist: String     // Salon
});

// ✅ Prevent double booking for same provider/date/time
bookingSchema.index({ provider: 1, date: 1, time: 1 }, { unique: true });

// ✅ Prevent OverwriteModelError in dev
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

module.exports = Booking;