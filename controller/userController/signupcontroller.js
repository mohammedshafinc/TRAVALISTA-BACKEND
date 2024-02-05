
const User = require('../../models/userregistration');
const bcrypt = require('bcrypt');


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

  postLogin: async (req, res) => {
    const {email, password} = req.body;
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
    } catch (error) {
      console.log('error in login', error);
    }
    res.status(200).json({message: 'user loggd'});
    console.log('post login', req.body);
  },
};


