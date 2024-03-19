const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();


const {
  guiderequest,
  adminresponse,
  getallguides,
  getallusers,
  blockstatus,
  getblockedguides,
} = require('../controller/admincontroller');


router.get('/getpendingguide', guiderequest);
router.get('/getguides', getallguides);
router.get('/getusers', getallusers);
router.get('/blocekdguides', getblockedguides);
router.patch('/adminresponse/:id', adminresponse);
router.patch('/blockstatus/:id', blockstatus);

module.exports = router;
