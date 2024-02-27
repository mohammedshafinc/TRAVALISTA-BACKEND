// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');

const Guide = require('../models/guideregistration');


module.exports = {
  postGuide: async (req, res)=>{
    const {email, mobilenumber} = req.body;
    try {
      const emailExit = await Guide.findOne({email});
      const mobileExist = await Guide.findOne({phonenumber: mobilenumber});
      if (emailExit) {
        return res.status(409).json({message: 'email already exist'});
      }
      if (mobileExist) {
        return res.status(409).json({message: 'mobile number already exist'});
      }
      if (req.file && req.file.location) {
        const filePath = req.file.location;
        console.log('fuuuuu', filePath);
        console.log(req.body);
        const {
          fullname,
          email,
          mobilenumber,
          totalexp,
          location,
          about,
          password,
        } = req.body;
        console.log('fffff', req.file.location);
        const newGuide = new Guide({
          fullname,
          email,
          phonenumber: mobilenumber,
          exp: totalexp,
          files: filePath,
          location,
          about: about,
          password,
        });
        await newGuide.save();
        console.log('user added succesfully');
        console.log(newGuide);
        res.status(200).json({
          newGuide,
          message: 'user added suucesfully',
        });
      } else {
        res.status(400).json({message: 'no file uploaded'});
      }
    } catch (err) {
      console.log('error in guide signup to database', err);
    }
  },
};
