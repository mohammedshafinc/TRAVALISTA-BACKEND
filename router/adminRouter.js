const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();


const {
  guiderequest,
  adminresponse,
  getallguides,
  getallusers,
} = require('../controller/admincontroller');


router.get('/getpendingguide', guiderequest);
router.get('/getguides', getallguides);
router.get('/getusers', getallusers);
router.patch('/adminresponse/:id', adminresponse);

module.exports = router;
