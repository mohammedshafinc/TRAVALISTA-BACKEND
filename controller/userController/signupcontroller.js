
require('dotenv').config();
const User = require('../../models/userregistration');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
      next();
    } catch (error) {
      console.log('error finding user', error);
    }
  },
  postVerifyOtp: async (req, res)=>{
    console.log('molil', req.body);
    try {
      const {fullName, email, mobileNumber, password} = req.body;
      console.log('ullil', req.body);
      const newUser = new User({
        fullname: fullName,
        email,
        mobile: mobileNumber,
        password,
      });

      await newUser.save();
      const token = jwt.sign({id: newUser._id}, process.env.SECRET_STR,
          {expiresIn: process.env.LOGIN_EXPIRES});
      console.log(token);
      console.log(newUser);
      console.log('user added succesfully');
      res.status(201).json({
        status: 'success',
        token,
        data: {
          user: newUser,
        },
      });
    } catch (err) {
      console.log('error adding user', err);
    }
  },

  postLogin: async (req, res) => {
    const {fullName, email, mobileNumber, password} = req.body;
    const data = {email, password, fullName, mobileNumber};
    console.log( 'data', data);
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
      res.status(200).json({message: 'user logged succesfully',
        user: existinguser});
      console.log('post login', req.body);
    } catch (error) {
      console.log('error in login', error);
    }
  },
};


