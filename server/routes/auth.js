const express = require('express');
const router = express.Router();
const {registerUser , loginUser , verifyOtp}= require('../controllers/authControllers');

router.post('/register', registerUser);
router.post('/login', loginUserUser);
router.post('/verify-otp', verifyOtp);