
const User = require ("../models/userModel.js")


const getUserBookings = async (req, res) =>{

    const userId = req.user.userId; 

    if(!userId){
        return res.status(404).json({msg:"UserId is required to get booked actictity list"})
    }

    try {
        
        const user = await User.findById(userId).populate("bookings");
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        return res.json(user.bookings);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
}


module.exports = getUserBookings;