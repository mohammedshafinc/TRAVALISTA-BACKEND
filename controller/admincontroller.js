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
      console.log('hello');
      const users = await UserUpdate.find();
      console.log(users);
      res.status(200).json({message: 'list of all user', users});
    } catch (error) {
      console.log(error);
    }
  },
};
