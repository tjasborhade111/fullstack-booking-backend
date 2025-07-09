// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connection = require('./db');


const app = express();

// Connect to MongoDB
connection();

// Middleware
app.use(express.json());

// CORS Middleware (allow only frontend origin in production)
app.use(cors({
  origin: '*', // Replace with actual frontend URL in production (e.g., "http://localhost:5173")
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookingRoutes');



app.use('/api/users', userRoutes);       // ✅ Signup
app.use('/api/auth', authRoutes);        // ✅ Login
app.use('/api/bookings', bookingRoutes); // ✅ Booking logic


// Root route (for testing)
app.get('/', (req, res) => {
  res.send('✅ Booking System API is running.');
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
