
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

require("dotenv").config();

const register = async (req, res) => {
     
    const { name, email, mobile, password } = req.body 



    const user = await User.findOne({ email });
    
    if (user) {
        return res
          .status(409)
          .json({ msg: "A user already exist with the provided email !" });
      }
    try {

        const createUser = new User({
            name,
            email,
            password,
            mobile,
            bookings:[]
        })

        await createUser.save()

        const payLoad = { userId: createUser._id }
        const jwtToken =  jwt.sign(payLoad, process.env.JWT_SECRET, {expiresIn:"1d"})

        // res.cookie("token", jwtToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "Strict",
        //     maxAge: 24 * 60 * 60 * 1000,
        // });

        return res.status(201).json({ msg: "User created successfully" , createUser , jwtToken })
    } catch (e) {

        console.error("Error while registering:", e.message);
        return res.status(500).json({ msg: "Cannot create user", error: e.message });

    }
}



module.exports = register