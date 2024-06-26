/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');
// const multer = require('multer');

const Guide = require('../models/guideregistration');
const Packages = require('../models/package');
const sendmail = require('../utility/nodemailer');
const User = require('../models/userregistration');


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
        isApproved: 'pending',
        blockStatus: 'unblocked',
      });
      await newGuide.save();
      const token = jwt.sign({id: newGuide._id, type: 'guide'},
          process.env.SECRET_STR, {expiresIn: process.env.LOGIN_EXPIRES});
      console.log('guide added succesfully and wait t');
      console.log(newGuide);
      await sendmail(email, 'verification');
      res.status(200).json({
        newGuide,
        token,
        message: 'guide added suucesfully wait For admin Approval',
      });
    } else {
      res.status(400).json({message: 'no file uploaded'});
    }
  },
  postguidelogin: async (req, res) => {
    try {
      // console.log('logged details', req.body);
      if (!req.body.email || !req.body.password) {
        return res.status(400)
            .json({message: 'Please enter your email and password.'});
      }
      const {email, password} = req.body;
      const existGuide = await Guide.findOne({email});
      if (!existGuide) {
        return res.status(404).json({message: 'guide not found '});
      }
      const comparePassword = await
      bcrypt.compare(password, existGuide.password);
      if (!comparePassword) {
        return res.status(401).json({message: 'password not match'});
      }
      if (existGuide.blockStatus == 'blocked') {
        return res.status(400).json({message: 'you are blocked , please contact admin'});
      }
      const token = jwt.sign({id: existGuide._id, type: 'guide'},
          process.env.SECRET_STR, {expiresIn: process.env.LOGIN_EXPIRES});
      // eslint-disable-next-line max-len
      return res.status(200).json({
        message: ' guide loggeed succesfully',
        guide: existGuide,
        token,
        guide: true,
        guideId: existGuide._id,
      });
    } catch (error) {
      console.log('error in guide login', error);
    }
  },

  guidedetails: async (req, res)=>{
    // console.log('haaaai');
    try {
      // console.log('token id in guide', req.token.id);
      const id = req.token.id;
      const guide = await Guide.findById(id);
      res.json(guide);
    } catch (error) {
      console.log('error in gt profile', error);
    }
  },

  guideprofileupdate: async (req, res)=>{
    // console.log('ffff', req.file.location);
    const imgfile = req?.file?.location;
    try {
      // eslint-disable-next-line max-len
      const {
        fullname,
        email,
        phonenumber,
        about,
        exp,
        location,
        street,
        city,
        state,
        pincode,
      } = req.body;
      console.log(req.body);

      const tokenid = new Mongoose.Types.ObjectId(req.token.id);
      console.log('t', tokenid);
      // eslint-disable-next-line no-unused-vars
      const update = await Guide.updateOne({_id: tokenid}, {$set: {
        fullname,
        email,
        phonenumber,
        about,
        exp,
        location,
        files: imgfile,
        street,
        city,
        state,
        pincode,
      }});
      if (update) {
        console.log(update);
        res.status(200).json({message: 'update succesfully'});
      }
    } catch (error) {
      console.log('error in update', error);
    }
  },
  addpackage: async (req, res) =>{
    // const amount = Number(req.body.amount);
    // console.log(req.body);
    // console.log('FLKDJSFLDKJF', req.file.location);
    const packageImg = req.file.location;
    const guideId = req.token.id;
    console.log('varumoo', guideId);
    try {
      // eslint-disable-next-line max-len
      const {packageName, description, amount, food, accomodation, activities, activityCount, duration} = req.body;
      const guide = await Guide.findById(guideId);
      console.log(guide);
      const guideName = guide.fullname;
      const newPackage = new Packages({
        packageName,
        description,
        amount,
        food,
        files: packageImg,
        accomodation,
        activities,
        activityCount,
        duration,
        guideId: guideId,
        guideName: guideName,
      });
      console.log(newPackage.guideName);
      await newPackage.save();
      res.status(200).json({message: 'package added succesfully', newPackage, guideId, guideName: guideName});
    } catch (error) {
      console.log('error in adding user', error);
    }
    // eslint-disable-next-line max-len, no-unused-vars
  },

  getpackages: async (req, res)=>{
    try {
      // console.log(req.params);
      const guideId = req.params.guideId;
      if (guideId && guideId !== 'null') {
        const packages = await Packages.find({guideId});
        console.log('ppppp', packages);
        res.status(200).json({packages});
      } else {
        console.log(guideId);
        const packages = await Packages.find();
        console.log('ddd', packages);
        res.status(200).json({packages});
      }
    } catch (error) {
      console.log(error);
    }
  },

  getselectedpackage: async (req, res) =>{
    try {
      // console.log(req.body);
      console.log(req.params);
      const packageid = req.params.id;

      const packages = await Packages.findOne({_id: packageid});
      // console.log(packages);
      res.status(200).json({packages});
    } catch (error) {
      console.log(error);
    }
  },
  packageupdate: async (req, res) =>{
    try {
      console.log(req.token.id);
      console.log('hekllo', req.body);
      // console.log(req.file);
      const packageId = req.params.id;
      const imgfile = req?.file?.location;
      const {packageName, amount, activities, food, activityCount, duration, accomodation, description} = req.body;

      const packageUpdate = await Packages.updateOne({_id: packageId}, {$set: {
        packageName,
        amount,
        food,
        activities,
        activityCount,
        duration,
        accomodation,
        description,
        files: imgfile,
      }});
      console.log(packageUpdate);
      res.status(200).json({message: ' package  updated succesfully'});
    } catch (error) {
      console.log(error);
    }
  },

  deletepackage: async (req, res) => {
    try {
      // console.log(req.params);
      const packageId = req.params.id;
      // eslint-disable-next-line no-unused-vars
      const deletepackage = await Packages.deleteOne({_id: packageId});
      // console.log(deletepackage);
      res.status(200).json({message: 'package deleted succesfully'});
    } catch (error) {
      console.log(error);
    }
  },

  singleguide: async (req, res) => {
    try {
      console.log(req.params);
      const guideId = req.params.id;

      const guide = await Guide.findOne({_id: guideId});
      console.log('hiiiii');
      console.log(guide);
      res.status(200).json({guide});
    } catch (error) {
      console.log(error);
    }
  },

  singleuser: async (req, res) => {
    try {
      console.log(req.params);
      const userId = req.params.id;

      const user = await User.findOne({_id: userId});
      console.log('hiiiii');
      // console.log(user);
      res.status(200).json({user});
    } catch (error) {
      console.log(error);
    }
  },
};
