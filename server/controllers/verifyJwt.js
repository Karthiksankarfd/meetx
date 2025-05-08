const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
require("dotenv").config()


const verifyJwt = async (req, res) => {

    // getting the token from the req 
    const authHeader = req.headers.authorization;

    // const token = req.cookies.token ;

    // checking is the header exists and It is correctly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1]

    // if(!token || token.trim() === ""){
    //     return res.status(404).json({ message: "No token not found" });
    // } 

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const payload = { userId: user._id }
        const refreshedToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })

        // res.cookie("token", refreshedToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "Strict",
        //     maxAge: 24 * 60 * 60 * 1000,
        // });

        return res.status(200).json({ msg: "valid token", user, refreshedToken })

    } catch (e) {

        // if no valid data found via token
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}


module.exports = verifyJwt;
