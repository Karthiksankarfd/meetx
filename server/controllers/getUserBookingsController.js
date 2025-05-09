
const Booking = require('../models/booking');
const Activity = require('../models/activitySchema');


const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const bookings = await Booking.find({ userId }).populate('activityId');

    const activities = bookings.map(booking => booking.activityId);

    res.status(200).json({ bookedActivities: activities });
  } catch (error) {
    res.status(500).json({ message: "Error fetching booked activities", error });
  }
};


module.exports = getUserBookings;