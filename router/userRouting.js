
const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

const
  {
    postSignup,
    postVerifyOtp,
    postLogin,
    getProfile,
    updateprofile,
    paymentcreateorder,
    paymentsuccess,
    getbookedpackages,
    getpreviousmsg,
  } = require('../controller/signupcontroller');
const validation = require('../middleware/validation/signupvalidation');
const token = require('../middleware/token/token');


router.post('/usersignup', validation, postSignup);
router.post('/verifyotp', postVerifyOtp);
router.post('/userlogin', postLogin);
router.post('/createorder', token, paymentcreateorder);
router.post('/paymentsuccess', token, paymentsuccess);
router.get('/getprofile', token, getProfile);
router.get('/bookedpackages', token, getbookedpackages);
router.post('/updateprofile/:userId', token, updateprofile);
router.get('/getpreviousmsg/:id', token, getpreviousmsg);


module.exports = router;

