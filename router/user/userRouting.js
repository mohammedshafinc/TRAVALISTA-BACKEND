
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// eslint-disable-next-line max-len
const {postSignup, postVerifyOtp, postLogin} = require('../../controller/userController/signupcontroller');
const validation = require('../../middleware/validation/signupvalidation');


router.post('/usersignup', validation, postSignup);
router.post('/verifyotp', postVerifyOtp);

router.post('/userlogin', postLogin);


module.exports = router;

