require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();

// ✅ Fix: CORS middleware before everything else
const allowedOrigins = [
  'https://tjasborhade111-fullstack-booking-sy.vercel.app' // ✅ your actual Vercel frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
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
