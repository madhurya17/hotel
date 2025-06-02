const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  maxCount: { type: Number, required: true },
  imageUrls: [{ type: String }],
  currentBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
