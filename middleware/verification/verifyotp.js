require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// eslint-disable-next-line require-jsdoc
async function verityOtp(req, res, next) {
  const phoneNumber = req.body.phoneNumber;
  try {
    client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        .verificationChecks
        .create({to: `+91${phoneNumber}`, code: '123456'})
        .then((verificationCheck) => console.log(verificationCheck.status));
    next();
  } catch (error) {
    console.log('error in verify otp', error);
  }
}

module.exports = verityOtp;
