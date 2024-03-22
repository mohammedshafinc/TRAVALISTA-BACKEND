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
  userblock,
  getblockedusers,
  showpackages,
} = require('../controller/admincontroller');


router.get('/getpendingguide', guiderequest);
router.get('/getguides', getallguides);
router.get('/getusers', getallusers);
router.get('/blocekdguides', getblockedguides);
router.get('/blocekdusers', getblockedusers);
router.get('/showpackages/:id', showpackages);
router.patch('/adminresponse/:id', adminresponse);
router.patch('/blockstatus/:id', blockstatus);
router.patch('/userblock/:id', userblock);

module.exports = router;
