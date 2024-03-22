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
    getpackages,
  } = require('../controller/guidecontroller.js');

router.post('/guideregister', postGuide);
router.post('/guideotpverify', upload.single('imgupload'), postOtpVerify);
router.post('/guidelogin', postguidelogin);
router.get('/guideprofile', token, guidedetails);
// eslint-disable-next-line max-len
router.patch('/guideprofileupdate/:userId', token, upload.single('imgupload'), guideprofileupdate);
router.post('/guideaddpackages', token, upload.single('imgupload'), addpackage);
router.get('/getpackages/:guideId', getpackages);


module.exports = router;
