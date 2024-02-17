
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// eslint-disable-next-line max-len
const {postSignup, postVerifyOtp, postLogin, getProfile} = require('../../controller/userController/signupcontroller');
const validation = require('../../middleware/validation/signupvalidation');
const token = require('../../middleware/token/token');


router.post('/usersignup', validation, postSignup);
router.post('/verifyotp', token, postVerifyOtp);

router.post('/userlogin', token, postLogin);
router.get('/getprofile', token, getProfile);


module.exports = router;

