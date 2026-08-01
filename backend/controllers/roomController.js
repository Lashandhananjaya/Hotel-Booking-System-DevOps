const Room = require("../models/Room");

// Get all rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add room
const addRoom = async (req, res) => {
  try {
    const room = new Room({
      name: req.body.name,
      price: req.body.price,
    });

    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRooms,
  addRoom,
};