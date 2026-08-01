const Booking = require("../models/Booking");

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { name, email, checkInDate, checkOutDate, roomName } = req.body;

    if (!name || !email || !checkInDate || !checkOutDate || !roomName) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const booking = await Booking.create({
      name,
      email,
      checkInDate,
      checkOutDate,
      roomName,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
};
