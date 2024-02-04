
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// eslint-disable-next-line max-len
const {postSignup, postVerifyOtp} = require('../../controller/userController/signupcontroller');
const SendOtp = require('../../middleware/verification/otpverification');
const verityOtp = require('../../middleware/verification/verifyotp');
const validation = require('../../middleware/validation/signupvalidation');


router.post('/usersignup', validation, SendOtp, postSignup);
router.post('/verifyotp', verityOtp, postVerifyOtp);

module.exports = router;

