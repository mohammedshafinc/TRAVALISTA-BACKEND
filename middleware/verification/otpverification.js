

require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
/**
 * Sends an OTP (One-Time Password) using Twilio.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function SendOtp(req, res, next) {
  try {
    const phoneNumber = req.body.mobileNumber;
    client.verify.v2.services('VA82c5e015c5365be58bf816e70c4d6f19')
        .verifications
        .create({to: `+91${phoneNumber}`, channel: 'sms'})
        .then((verification) => console.log(verification.status));
    // console.log('from middleware', req.mobileNumber);

    next();
  } catch (err) {
    console.log('otp sending error', err);
  }
}
module.exports = SendOtp;
