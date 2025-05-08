const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = async(req, res, next)=>{
    
    // getting the token from the req 
    const authHeader = req.headers.authorization;

    // checking is the header exists and It is correctly formatted
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or malformed" });
    }
    
    // extracting token
    const token = authHeader.split(" ")[1]
    // decoding and attaching the dedode user object to the req object

    try {
    //  console.log(process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      // passing  to next middleware function - controller
      next();
      
    } catch (err) {
      console.log("Unauthorized: Invalid token" , err)
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = verifyToken;