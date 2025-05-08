const activities = require("../MOCKDATA/activities")
const User =  require("../models/userModel")
const Activity =  require("../models/activitySchema");
const { use } = require("../routes/authRoutes");

const bookActivity = async (req, res)=>{
    const { activityId } =  req.params;
    
    const user  = req.user.userId

    if(!activityId || !user) {
        return  res.status(401).json({msg:"Invalid Info for booking activity..."})
    }

    try{

        const currentUser = await User.findById(user).select("bookings")
        const activity = await Activity.findById(activityId)

        if (!activity) {
            return res.status(404).json({ msg: "Activity not found" });
          }
      
          // Avoid double booking 
          if (currentUser.bookings.includes(activity._id)) {
            return res.status(409).json({ msg: "Activity already booked" });
          }

        currentUser.bookings.push(activity._id)
        await currentUser.save()
        res.status(200).json({ msg: "Activity booked successfully", activity });

    }catch(e){
        console.log("error booking the activity ..." , e)
        return res.status(500).json({msg:"error booking the activity ..."})
    }
}

module.exports =  bookActivity