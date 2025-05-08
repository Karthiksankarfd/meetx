const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")

const validateAndHashUser = [
    // 1. Validation rules
    body('name').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6, max: 30 }).withMessage('Password must be at least 6 characters and less than 30 characters' ),
    body("mobile").isNumeric().withMessage("Mobile number should contain only numbers").isLength({ min: 10, max: 10 }),

    // 2.logic to handle validation + hashing
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // hashing the password
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            next();
        } catch (e) {
            res.status(500).json({ message: 'Error hashing password' });
        }
    }
]

module.exports = validateAndHashUser