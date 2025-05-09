
const isValidUser =  require("../middlewares/verifyToken")
const router = require("./authRoutes")
const getUserBookings =  require("../controllers/getUserBookingsController")

router.get("/mybookings" , isValidUser , getUserBookings)

module.exports = router