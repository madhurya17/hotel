const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { protect } = require('../middleware/authMiddleware');

// Create a booking
router.post('/', protect, async (req, res) => {
  const { roomId, fromDate, toDate } = req.body;
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check for overlapping bookings
    const bookings = await Booking.find({
      room: roomId,
      status: 'booked',
      $or: [
        { fromDate: { $lte: new Date(toDate), $gte: new Date(fromDate) } },
        { toDate: { $lte: new Date(toDate), $gte: new Date(fromDate) } },
        { fromDate: { $lte: new Date(fromDate) }, toDate: { $gte: new Date(toDate) } }
      ]
    });

    if (bookings.length > 0) {
      return res.status(400).json({ message: 'Room is already booked for the selected dates' });
    }

    const booking = new Booking({
      user: req.user._id,
      room: roomId,
      fromDate,
      toDate,
      status: 'booked'
    });

    await booking.save();

    // Add booking to room's currentBookings
    room.currentBookings.push(booking._id);
    await room.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel a booking
router.put('/cancel/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    booking.status = 'cancelled';
    await booking.save();

    // Remove booking from room's currentBookings
    const room = await Room.findById(booking.room);
    room.currentBookings = room.currentBookings.filter(bid => bid.toString() !== booking._id.toString());
    await room.save();

    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bookings for logged in user
router.get('/mybookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('room');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
