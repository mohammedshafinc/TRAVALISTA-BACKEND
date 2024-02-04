module.exports = {
  getsignup: ()=>{
    console.log('hello');
  },
  postSignup: (req, res)=>{
    console.log(req.body);
  },
  postVerifyOtp: (req, res)=>{
    console.log(req.body);
  },
};
