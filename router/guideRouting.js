/* eslint-disable max-len */
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
    getselectedpackage,
    packageupdate,
    deletepackage,
  } = require('../controller/guidecontroller.js');

router.post('/guideregister', postGuide);
router.post('/guideotpverify', upload.single('imgupload'), postOtpVerify);
router.post('/guidelogin', postguidelogin);
router.get('/guideprofile', token, guidedetails);
router.get('/getpackages/:guideId', token, getpackages);
router.get('/selectedpackage/:id', token, getselectedpackage);

router.patch('/guideprofileupdate/:userId', token, upload.single('imgupload'), guideprofileupdate);
router.patch('/guidepackageupdate/:id', token, upload.single('imgupload'), packageupdate);

router.post('/guideaddpackages', token, upload.single('imgupload'), addpackage);

router.delete('/deletepackage/:id', deletepackage);


module.exports = router;
