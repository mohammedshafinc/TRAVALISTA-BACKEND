const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require('../middleware/multer.js');

const {postGuide, postOtpVerify} = require('../controller/guidecontroller.js');

router.post('/guideregister', postGuide);
router.post('/guideotpverify', upload.single('imgupload'), postOtpVerify);

module.exports = router;
