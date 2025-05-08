const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const login = async (req, res) => {
    const { loginemail, loginpassword } = req.body;

    if (!loginemail || !loginpassword) {
        return res.status(401).json({ msg: "Invalid credentials ...Enter valid email and password" });
    }

    try {
        const user = await User.findOne({ email: loginemail }).select("+password");

        if (!user) {
            return res.status(404).json({ msg: "No user found with the Provided email" });
        }

        const isvalidPassword = await bcrypt.compare(loginpassword, user.password);

        if (!isvalidPassword) {
            return res.status(401).json({ msg: "Invalid PassWord" });
        }

        const { password, ...userdata } = user.toObject();
        const payLoad = { userId: user._id };
        const jwtToken = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(201).json({ msg: "Login Successful", userdata, jwtToken });
    } catch (e) {
        return res.status(500).json({ error: e.message, msg: "Error in login" });
    }
};

module.exports = login;
