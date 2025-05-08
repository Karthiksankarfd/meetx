
const isValidUser =  require("../middlewares/verifyToken")
const router = require("./authRoutes")
const getUserBookings =  require("../controllers/bookings")

router.get("/mybookings" , isValidUser , getUserBookings)

module.exports = router