// controllers/bookingController.js

const Booking = require('../models/booking');

const bookActivity = async (req, res) => {

    try {

        const userId = req.user.userId; // from auth middleware
        const { activityId } = req.params;

        if (!userId || !activityId) {
            return res.status(404).json({ msg: "No valid data to book" })
        }

        // Optional: Check if user already booked
        const alreadyBooked = await Booking.findOne({ userId, activityId });
        
        if (alreadyBooked) {
            return res.status(409).json({ message: "Activity already booked." });
        }

        const booking = new Booking({ userId, activityId });
        await booking.save();

        res.status(201).json({ message: "Activity booked successfully", booking });

    } catch (error) {

        res.status(500).json({ message: "Server error", error });

    }
};


module.exports = bookActivity