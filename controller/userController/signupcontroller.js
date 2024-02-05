
const User = require('../../models/userregistration');


module.exports = {
  getsignup: ()=>{
    console.log('hello');
  },
  postSignup: (req, res)=>{
    console.log(req.body);
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
      console.log(newUser);
      console.log('user added succesfully');
    } catch (err) {
      console.log('error adding user', err);
    }
  },
};
