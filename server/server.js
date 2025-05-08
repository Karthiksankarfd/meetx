const express =  require("express")
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const connectToDb = require("./config/db")
const authentication = require("./routes/authRoutes")
const activities = require("./routes/getActivitiesRoutes")
const bookActivity = require("./routes/bookActivityRoute")
const userBookings =  require("./routes/userBookings")
connectToDb()
app.use(express.json())// Middleware to parse JSON

app.use(express.urlencoded({ extended: true })); // For form data

// Middleware to parse cookies
app.use(cookieParser());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.use("/api/auth", authentication)
app.use("/api" , activities)
app.use("/api" , bookActivity )
app.use("/api" , userBookings)
// Start server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});