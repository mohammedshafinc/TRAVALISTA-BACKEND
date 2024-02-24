
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

const
  {
    postSignup,
    postVerifyOtp,
    postLogin,
    getProfile,
  } = require('../controller/signupcontroller');
const validation = require('../middleware/validation/signupvalidation');
const token = require('../middleware/token/token');


router.post('/usersignup', validation, postSignup);
router.post('/verifyotp', postVerifyOtp);

router.post('/userlogin', postLogin);
router.get('/getprofile', token, getProfile);


module.exports = router;

