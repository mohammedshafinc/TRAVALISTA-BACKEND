/* eslint-disable max-len */

const Guide = require('../models/guideregistration');
const UserUpdate = require('../models/userregistration');
const sendmail = require('../utility/nodemailer');
// const Mongoose = require('mongoose');
module.exports = {

  guiderequest: async (req, res) => {
    try {
      const pendingGuides = await Guide.find({isApproved: 'pending'});
      res.status(200).json({pendingGuides});
    } catch (error) {

    }
  },

  adminresponse: async (req, res) =>{
    try {
      const id = req.params.id;
      console.log(id);
      console.log(req.body.status);
      const status = req.body.status;
      // eslint-disable-next-line new-cap
      if (status == 'accepted') {
        const statusUpdate = await Guide.findOneAndUpdate({_id: id}, {$set: {
          isApproved: 'approved',
        }});
        console.log(statusUpdate);
        email = statusUpdate.email;
        sendmail(email, 'isAccept');
        res.status(200).json({message: 'status updated', isapproved: 'approved', guide: statusUpdate});
      } else if (status == 'rejected') {
        const statusUpdate = await Guide.findOneAndUpdate({_id: id}, {$set: {
          isApproved: 'rejected',
        }});
        email = statusUpdate.email;
        sendmail(email, 'isReject');
        console.log(statusUpdate);
        res.status(200).json({message: 'status updated', isapproved: 'rejected', guide: statusUpdate});
      }
    } catch (error) {
      console.log(error);
    }
  },
  getallguides: async (req, res) =>{
    try {
      const guides = await Guide.find();
      res.status(200).json({message: 'list of all guides', guides});
    } catch (error) {
      console.log(error);
    }
  },
  getallusers: async (req, res ) =>{
    try {
      const users = await UserUpdate.find( {role: 'user'});
      // console.log(users);
      res.status(200).json({message: 'list of all user', users});
    } catch (error) {
      console.log(error);
    }
  },

  blockstatus: async (req, res) =>{
    try {
      const id = req.params.id;
      blockStatus = req.body.blockstatus;
      if ( blockStatus == 'blocked') {
        const blockupdate = await Guide.findOneAndUpdate({_id: id}, {$set: {
          blockStatus: 'blocked',
        }});
        res.json({message: 'user blocked succesfully', guide: blockupdate});
      }
      if (blockStatus == 'unblocked') {
        const blockupdate = await Guide.findOneAndUpdate({_id: id}, {$set: {
          blockStatus: 'unblocked',
        }});
        res.json({message: 'user unblocked succesfully', guide: blockupdate});
      }
    } catch (error) {
      console.log(error);
    }
  },

  getblockedguides: async (req, res) =>{
    try {
      const blockedguides = await Guide.find({blockStatus: 'blocked'});
      if (blockedguides.length === 0) {
        return res.status(200).json({message: 'no blocked guides available', blockedguides});
      }
      return res.status(200).json({message: 'all blocekd guides', blockedguides});
    } catch (error) {
      console.log(error);
    }
  },
};
