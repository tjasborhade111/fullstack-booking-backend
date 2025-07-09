// routes/bookingRoutes.js
const router = require('express').Router();
const Booking = require('../models/Booking');

// 📥 Create a new booking
router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: '✅ Booking successful', booking: newBooking });
  } catch (err) {
    console.error("❌ Booking creation error:", err);
    res.status(500).json({ message: '❌ Failed to save booking', error: err.message });
  }
});

// 📤 Get all bookings for a specific user (by userId)
router.get('/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ bookedAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Error fetching user bookings:", err);
    res.status(500).json({ message: '❌ Failed to fetch bookings' });
  }
});

module.exports = router;
