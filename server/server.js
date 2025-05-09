const express =  require("express")
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const connectToDb = require("./config/db")
const authentication = require("./routes/authRoutes")
const activities = require("./routes/getActivitiesRoutes")
const bookActivity = require("./routes/bookingRoutes")
const userBookings =  require("./routes/userBookings")
const book = require("./routes/bookingRoutes")
connectToDb()
app.use(express.json())// Middleware to parse JSON

app.use(express.urlencoded({ extended: true })); // For form data

// Middleware to parse cookies
app.use(cookieParser());

// Basic route
app.get('/', (req, res) => {
   return res.status(201).json({mgs:"This meetx apis... This code contains all the postman api collection in order to test the api end points.Try https://meetx-qwo1.onrender.com/api/activities" });
});

app.use("/api/auth", authentication)
app.use("/api" , activities)
app.use("/api" , book)
app.use("/api" , userBookings)


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/activities`);
});