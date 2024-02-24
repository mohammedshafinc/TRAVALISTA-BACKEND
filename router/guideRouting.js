const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const upload = require('../middleware/multer.js');

const {postGuide} = require('../controller/guidecontroller.js');

router.post('/guideregister', upload.single('files'), postGuide);

module.exports = router;
