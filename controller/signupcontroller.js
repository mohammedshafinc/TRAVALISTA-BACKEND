/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable new-cap */

require('dotenv').config();
const User = require('../models/userregistration');
// const UserUpdates = require('../models/userupdate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');
const razorpay = require('../utility/razorpay');
const Payment = require('../models/packagebooking');

const sendOTP = require('../utility/twilio');
const verifyOtp = require('../utility/verifyotp');

module.exports = {
  getsignup: (req, res)=>{
    console.log('hello');
  },
  postSignup: async (req, res)=>{
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
    // eslint-disable-next-line no-unused-vars
    const verify = verifyOtp(req.body.mobileNumber, req.body.otp);
    console.log(req.body.mobileNumber, req.body.otp);
    if (req.body.otp == null || req.body.otp == '') {
      res.json({message: 'u are not entered otp'});
    }
    try {
      const {fullName, email, mobileNumber, password} = req.body;
      const newUser = new User({
        fullname: fullName,
        email,
        mobile: mobileNumber,
        password,
        blockStatus: 'unblocked',
        role: 'user',
      });
      await newUser.save();
      const token = jwt.sign({id: newUser._id},
          process.env.SECRET_STR, {expiresIn: process.env.LOGIN_EXPIRES});
      console.log(token);
      console.log('user added successfully');
      // Send response after user registration
      console.log(newUser);
      return res.status(201).json({
        status: 'success',
        token,
        type: 'user',
        user: newUser,
      });
    } catch (err) {
      console.log('error adding user', err);
      // Handle error adding user
      return res.status(500).json({error: 'Error verifying otp user'});
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
      if (!passwordMatch && existinguser.role == 'user') {
        return res.status(401).json({message: ' user password not match', role: 'user'});
      } else if (!passwordMatch && existinguser.role == 'admin') {
        // eslint-disable-next-line max-len
        return res.status(404).json({message: 'the password of admin not match', role: 'admin'});
      } else {
        const token = jwt.sign({id: existinguser._id},
            process.env.SECRET_STR, {expiresIn: process.env.LOGIN_EXPIRES});
        console.log('token', token);
        if (existinguser.role == 'user' ) {
          console.log('user logged');
          res.status(200).json({message: 'logged succesfully',
            user: existinguser, token, type: 'user', login: true});
          // console.log('pundachi');
          // console.log('exist', existinguser);
        } else if (existinguser.role =='admin') {
          console.log('admin logged');
          res.status(200).json({message: ' admin logged succesfully',
            admin: existinguser, token, type: 'admin', login: true});
          // console.log('pundachi');
          // console.log('exist', existinguser);
        }
        // console.log('post login', req.body);
      }
    } catch (error) {
      console.log('error in login', error);
    }
  },

  getProfile: async (req, res)=>{
    try {
      // console.log('tokenid', req.token.id);
      const id = new Mongoose.Types.ObjectId(req.token.id);
      console.log('id', id);
      const user = await User.findById(id);
      // console.log(user);

      res.json(user);
    } catch (err) {
      console.log('error getting profile', err);
    }
  },


  updateprofile: async (req, res) =>{
    try {
      // console.log(req.body);
      // eslint-disable-next-line max-len
      const {fullname, email, mobile, about, street, city, state, pincode} = req.body;
      const tokenid = new Mongoose.Types.ObjectId(req.token.id);
      // eslint-disable-next-line no-unused-vars
      const update = await User.updateOne({_id: tokenid}, {$set: {
        fullname,
        email,
        mobile,
        about,
        street,
        city,
        state,
        pincode,
      }},
      {upsert: true},
      );
      res.status(200).json({message: 'updated succesfully'});
    } catch (error) {
      console.log('error in update', error);
    }
  },

  paymentcreateorder: (req, res) =>{
    try {
      // console.log(req.body);
      razorpay.orders.create({
        amount: req.body.amount * 100,
        currency: 'INR',
        receipt: 'receipt_' + Math.random().toString(36).substring(2, 15),
      }).then((order)=>{
        res.json(order);
        console.log('order', order);
      }).catch((error)=>{
        console.log(error);
        res.status(500).json({error: 'failed to create order'});
      });
    } catch (error) {
      console.log(error);
    }
  },

  paymentsuccess: async (req, res) =>{
    console.log(req.body);
    console.log(req.token.id);
    const userId = req.token.id;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_order_id = req.body. razorpay_order_id;
    const razorpay_signature = req.body.razorpay_signature;

    const user = await User.findOne({_id: userId});
    console.log('user', user);
    const username = user.fullname;
    const email = user.email;
    console.log(username, 'haaai,', email);

    const booking = new Payment({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      userid: userId,
      purchaseduser: username,
      purchaseuseremail: email,
    });
    await booking.save();
    console.log('bboking', booking);
    res.status(200).json({message: 'pachage added to database', booking});
  },


};


