

/* eslint-disable require-jsdoc */
function validation(req, res, next) {
  const {email, mobileNumber, password, confirmPassword} = req.body;
  console.log('signup', req.body);
  const ePattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const eCheck = ePattern.test(email);
  const ppattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@^!%*?&])(?=.*[0-7]).{8,}$/;
  const pCheck = ppattern.test(password);
  const mobilePattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  const mCheck = mobilePattern.test(mobileNumber);
  let bool = false;
  if (password == confirmPassword) {
    bool = true;
  }

  // const passwordmatch = password === confirmpassword;
  console.log(eCheck, pCheck, mCheck, bool);


  try {
    if (!eCheck) {
      res.status(400).json({message: 'error in email check'});
    } else if (!pCheck) {
      res.status(400).json({message: 'error in password check'});
    } else if (!mCheck) {
      res.status(400).json({message: 'mobile number checking error'});
    } else if (!bool) {
      res.status(400).json({message: 'password and confirm password not matc'});
    } else {
      console.log('deeeereeeeeeee');
      next();
    }
  } catch (error) {
    console.log('error in validation', error);
  }
}
module.exports = validation;
