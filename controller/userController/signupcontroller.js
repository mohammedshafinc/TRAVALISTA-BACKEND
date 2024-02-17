
require('dotenv').config();
const User = require('../../models/userregistration');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Mongoose = require('mongoose');

const sendOTP = require('../../utility/twilio');
const verifyOtp = require('../../utility/verifyotp');


module.exports = {
  getsignup: (req, res)=>{
    console.log('hello');
  },
  postSignup: async (req, res, next)=>{
    const {email, mobileNumber} = req.body;
    try {
      const emailExist = await User.findOne({
        email: email,
      });
      const numberExist = await User.findOne({
        mobile: mobileNumber,
      });
      console.log(mobileNumber);

      if (emailExist) {
        console.log('email exist or number');
        return res.status(409).json({
          message: `user with this ${email} already exist`,
        });
      }
      if (numberExist) {
        console.log('email exist or number');
        return res.status(409).json({
          message: `mobile number ${mobileNumber} already exist`,
        });
      }
      const status = sendOTP(req.body.mobileNumber);
      if (status) {
        res.json({message: 'OTP send succesfully'});
      } else {
        res.json({message: 'failed to send Otp'});
      }
    } catch (error) {
      console.log('error finding user', error);
    }
  },
  postVerifyOtp: async (req, res) => {
    const verify = verifyOtp(req.body.mobileNumber, req.body.otp);
    if (verify) {
      console.log('otp verified');
      try {
        const {fullName, email, mobileNumber, password} = req.body;
        const newUser = new User({
          fullname: fullName,
          email,
          mobile: mobileNumber,
          password,
        });
        await newUser.save();
        const token = jwt.sign({id: newUser._id},
            process.env.SECRET_STR, {expiresIn: process.env.LOGIN_EXPIRES});
        console.log(token);
        console.log('user added successfully');
        // Send response after user registration
        console.log('pundachi thalla');
        console.log(newUser);
        return res.status(201).json({
          status: 'success',
          token,
          user: newUser,
        });
      } catch (err) {
        console.log('error adding user', err);
        // Handle error adding user
        return res.status(500).json({error: 'Error adding user'});
      }
    } else {
      console.log('failed to verify otp');
      // Send response for failed OTP verification
      return res.status(400).json({message: 'Failed to verify OTP'});
    }
  },


  postLogin: async (req, res) => {
    const {email, password} = req.body;
    // const data = {email, password};
    // console.log( 'logged data', data);
    try {
      const existinguser = await User.findOne({email});
      if (!existinguser) {
        return res.status(404).json({message: 'user not found'});
      }

      const passwordMatch = await bcrypt.compare(
          password, existinguser.password);
      if (!passwordMatch) {
        return res.status(401).json({message: 'password not match'});
      }
      const token = jwt.sign({id: existinguser._id},
          process.env.SECRET_STR, {expiresIn: process.env.LOGIN_EXPIRES});
      res.status(200).json({message: 'user logged succesfully',
        user: existinguser, token, login: true});
      console.log('pundachi');
      console.log(existinguser);
      // console.log('post login', req.body);
    } catch (error) {
      console.log('error in login', error);
    }
  },

  getProfile: async (req, res)=>{
    try {
      console.log('tokenid', req.token.id);
      const id = req.token.id;
      console.log('id', id);
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json(({message: 'no user'}));
      }
      res.json(user);
    } catch (err) {
      console.log('error getting profile', err);
    }
  },

};


