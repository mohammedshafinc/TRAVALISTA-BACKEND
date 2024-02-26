// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');

const Guide = require('../models/guideregistration');


module.exports = {
  postGuide: async (req, res)=>{
    const filePath = req.file.location;
    try {
      console.log(req.body);
      const {
        fullname,
        email,
        mobilenumber,
        totalexp,
        location,
        about,
      } = req.body;
      console.log('fffff0', req.file.location);
      const newGuide = new Guide({
        fullname,
        email,
        phonenumber: mobilenumber,
        exp: totalexp,
        files: filePath,
        location: location,
        about,
      });
      await newGuide.save();
      console.log('user added succesfully');
      console.log(newGuide);
      res.status(200).json({
        newGuide,
        message: 'user added suucesfully',
      });
    } catch (err) {
      console.log('error in guide signup to database', err);
    }
  },
};
