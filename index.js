require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();

// ✅ Fix: CORS middleware before everything else
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// ✅ Parse JSON
app.use(express.json());

// ✅ Connect to MongoDB Atlas
connection();

// ✅ Routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/users', userRoutes);       // Signup
app.use('/api/auth', authRoutes);        // Login
app.use('/api/bookings', bookingRoutes); // Booking logic

// ✅ Root test
app.get('/', (req, res) => {
  res.send('✅ Booking System API is running.');
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
