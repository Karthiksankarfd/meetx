const express = require("express");
const router = express.Router();
const bookActivity = require("../controllers/bookActivity")
const isValidUser =  require("../middlewares/verifyToken")


router.put("/bookactivity/:activityId" , isValidUser, bookActivity)

module.exports = router ;