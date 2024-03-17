const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();


const {
  guiderequest,
  adminresponse,
  getallguides,
} = require('../controller/admincontroller');


router.get('/getpendingguide', guiderequest);
router.get('/getguides', getallguides);
router.patch('/adminresponse/:id', adminresponse);

module.exports = router;
