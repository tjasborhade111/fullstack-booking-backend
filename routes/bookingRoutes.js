const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// ✅ POST - Book a new appointment
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      userName,
      name,
      age,
      date,
      time,
      category,
      provider,
      symptoms,
      subject,
      mode,
      stylist,
    } = req.body;

    // Debug incoming data
    console.log('📦 Incoming booking data:', req.body);

    // ✅ Validate required fields
    const requiredFields = [userId, userName, name, date, time, category, provider];
    const missing = requiredFields.some(field => !field || field === '');
    if (missing) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBooking = new Booking({
      userId,
      userName,
      name,
      age,
      date,
      time,
      category,
      provider,
      symptoms,
      subject,
      mode,
      stylist,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking saved successfully', booking: newBooking });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Slot already booked for this provider at the selected time' });
    }

    console.error('❌ Error while saving booking:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// ✅ GET - Fetch bookings by user ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId }).sort({ bookedAt: -1 });

    if (!bookings || bookings.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error('❌ Error fetching bookings:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

module.exports = router;