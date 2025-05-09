const Activity = require("../models/activitySchema");

const activitiesList = async (req, res) => {

  try {

    const activities = await Activity.find();
    return res.status(200).json(activities);
    
  } catch (e) {

    return res.status(500).json({ msg: "Error fetching activity" });
  }
};

module.exports = activitiesList;
