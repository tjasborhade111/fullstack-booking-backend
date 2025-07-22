const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  userName: {
    type: String,
    required: true
  },
  name: String,
  age: String,
  date: String,
  time: String,
  category: String,
 appointmentWith: {
  type: String,
  required: true
},
  symptoms: String,
  subject: String,
  mode: String,
  serviceType: String,
  stylist: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
