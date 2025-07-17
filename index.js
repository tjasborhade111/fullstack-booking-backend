require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();

// ✅ CORS Middleware FIRST
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://tjasborhade111-fullstack-booking-sy.vercel.app'
    ];

    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ CORS error: ${origin} not allowed`);
      callback(null, false); // safer than throwing an error
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));


// ✅ Parse JSON
app.use(express.json());

// ✅ DB Connection
connection();

// ✅ Routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// ✅ Home route
app.get('/', (req, res) => {
  res.send('Booking System API is running.');
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});