const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');

const Guide = require('../models/guideregistration');
const sendmail = require('../utility/nodemailer');


module.exports = {
  postGuide: async (req, res)=>{
    const {email, mobilenumber} = req.body;
    console.log(req.body);
    try {
      const emailExit = await Guide.findOne({email});
      const mobileExist = await Guide.findOne({phonenumber: mobilenumber});
      if (emailExit) {
        return res.status(409).json({message: 'email already exist'});
      } else if (mobileExist) {
        return res.status(409).json({message: 'mobile number already '});
      } else {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        await sendmail(email, otp);
        console.log('otp send succesfully');
        res.status(200).json({message: 'otp send', otp});
      }
    } catch (err) {
      console.log('error to send otp', err);
    }
  },
  postOtpVerify: async (req, res) => {
    console.log('body', req.body);
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
  },
  postguidelogin: async (req, res) => {
    try {
      console.log('logged details', req.body);
      if (!req.body.email || !req.body.password) {
        return res.status(400)
            .json({message: 'Please enter your email and password.'});
      }
      const {email, password} = req.body;
      const existGuide = await Guide.findOne({email});
      if (!existGuide) {
        res.status(404).json({message: 'guide not found '});
      }
      const comparePassword = await
      bcrypt.compare(password, existGuide.password);
      if (!comparePassword) {
        res.status(401).json({message: 'password not match'});
      }
      res.status(200).json({message: 'loggeed succesfully'});
    } catch (error) {
      console.log('error in guide login', error);
    }
  },
};
