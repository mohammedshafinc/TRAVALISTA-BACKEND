/* eslint-disable max-len */

const Guide = require('../models/guideregistration');
const User = require('../models/userregistration');
const Package = require('../models/package');
const sendmail = require('../utility/nodemailer');
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
      const users = await User.find( {role: 'user'});
      console.log(users);
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
        res.json({message: 'guide blocked succesfully', guide: blockupdate});
      }
      if (blockStatus == 'unblocked') {
        const blockupdate = await Guide.findOneAndUpdate({_id: id}, {$set: {
          blockStatus: 'unblocked',
        }});
        res.json({message: 'guide unblocked succesfully', guide: blockupdate});
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
  userblock: async (req, res) => {
    try {
      const id = req.params.id;
      console.log('body', req.body);
      console.log(id);
      const blockStatus = req.body.blockstatus;
      console.log(blockStatus);
      if ( blockStatus == 'blocked') {
        const blockupdate = await User.findOneAndUpdate({_id: id}, {$set: {
          blockStatus: 'blocked',
        }});
        console.log(blockupdate);
        return res.json({message: 'User blocked succesfully', User: blockupdate});
      }
      if (blockStatus == 'unblocked') {
        const blockupdate = await User.findOneAndUpdate({_id: id}, {$set: {
          blockStatus: 'unblocked',
        }});
        return res.json({message: 'User unblocked succesfully', User: blockupdate});
      }
    } catch (error) {
      console.log(error);
    }
  },
  getblockedusers: async (req, res) =>{
    try {
      const blockeduser = await User.find({blockStatus: 'blocked'});
      if (blockeduser.length === 0) {
        return res.status(200).json({message: 'no blocked guides available', blockeduser});
      }
      return res.status(200).json({message: 'all blocekd guides', blockeduser});
    } catch (error) {
      console.log(error);
    }
  },
  showpackages: async (req, res) => {
    const packageId = req.params.id;
    try {
      console.log('lkdkmfldsfldnkf');
      console.log(packageId);
      // eslint-disable-next-line new-cap
      const showPackage = await Package.findOne({_id: packageId});
      console.log('dfsdfdsf', showPackage);
      if (!showPackage) {
        return res.status(404).json({error: 'Package not found'});
      }
      // Return the found package
      return res.json(showPackage);
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: 'Internal Server Error'});
    }
  },
};
