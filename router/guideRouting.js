const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require('../middleware/multer.js');
const token = require('../middleware/token/token');

const
  {
    postGuide,
    postOtpVerify,
    postguidelogin,
    guidedetails,
    guideprofileupdate,
    addpackage,
  } = require('../controller/guidecontroller.js');

router.post('/guideregister', postGuide);
router.post('/guideotpverify', upload.single('imgupload'), postOtpVerify);
router.post('/guidelogin', postguidelogin);
router.get('/guideprofile', token, guidedetails);
router.patch('/guideprofileupdate/:userId', token, guideprofileupdate);
router.post('/guideaddpackages', token, addpackage);


module.exports = router;
