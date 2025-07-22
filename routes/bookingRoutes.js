const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// ✅ Save Booking
router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking saved successfully!' });
  } catch (error) {
    console.error('❌ Error while saving booking:', error);
    res.status(500).json({ message: 'Failed to save booking', error });
  }
});

// ✅ Get Bookings for a Specific User (optional filter by category)
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { category } = req.query;

  try {
    // Build query object
    let query = { userId };

    // If category is present in query, add to filter
    if (category) {
      query.category = category;
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.error('❌ Error fetching user bookings:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

module.exports = router;
