const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get room by id
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new room (admin only)
router.post('/', protect, admin, async (req, res) => {
  const { name, description, price, maxCount, imageUrls } = req.body;
  try {
    const room = new Room({ name, description, price, maxCount, imageUrls });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit room (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    const { name, description, price, maxCount, imageUrls } = req.body;
    room.name = name || room.name;
    room.description = description || room.description;
    room.price = price || room.price;
    room.maxCount = maxCount || room.maxCount;
    room.imageUrls = imageUrls || room.imageUrls;
    await room.save();
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete room (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    await room.remove();
    res.json({ message: 'Room removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
