
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// eslint-disable-next-line max-len
const {postSignup} = require('../../controller/userController/signupcontroller');
const SendOtp = require('../../middleware/verification/otpverification');


router.post('/usersignup', SendOtp, postSignup);

module.exports = router;

