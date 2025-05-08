const express =  require('express')
const router = express.Router()
const register = require("../controllers/register")
const verifyJwt =  require("../controllers/verifyJwt")
const login = require("../controllers/login")

// middleware function for validating user registration details
const validateAndHashUser =  require("../middlewares/validateAndHashUser")

router.post("/register" , validateAndHashUser, register)
router.post("/verifyjwt" , verifyJwt)
router.post("/login" , login)

module.exports = router;