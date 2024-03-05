const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
      const token = jwt.sign({id: newGuide._id},
          process.env.SECRET_STR, {expiresIn: process.env.LOGIN_EXPIRES});
      console.log('user added succesfully');
      console.log(newGuide);
      res.status(200).json({
        newGuide,
        token,
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
      const token = jwt.sign({id: existGuide._id},
          process.env.SECRET_STR, {expiresIn: process.env.LOGIN_EXPIRES});
      // eslint-disable-next-line max-len
      res.status(200).json({message: 'loggeed succesfully', guide: existGuide, token, logged: true});
    } catch (error) {
      console.log('error in guide login', error);
    }
  },

  guidedetails: async (req, res)=>{
    console.log('haaaai');
    try {
      console.log('token id in guide', req.token.id);
      const id = req.token.id;
      const guide = await Guide.findById(id);
      // if (!guide) {
      //   return res.status(404).json({message: 'no user'});
      // }
      res.json(guide);
    } catch (error) {
      console.log('error in gt profile', error);
    }
  },

  guideprofileupdate: async (req, res)=>{
    console.log('hhhhhhhhhhhhhaiiiiiiiiiiiiiiiiiiiiiiii');
    try {
      console.log(req.body);
      res.status(404).json({message: 'update succesfully'});
    } catch (error) {
      console.log('error in update', error);
    }
  },
};
