
const express = require('express');
const router = express.Router();

const bookActivity  = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/verifyToken');

router.put('/book/:activityId', authMiddleware, bookActivity);

module.exports = router;
