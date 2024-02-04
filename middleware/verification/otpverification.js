

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
async function SendOtp(req, res, next) {
  console.log('sunnni');
  const phoneNumber = req.body.mobileNumber;
  try {
    await client.verify.v2.services(process.env.SERVICE_ID)
        .verifications
        .create({to: `+91${phoneNumber}`, channel: 'sms'});
    res.json({message: 'OTP send succesfully'});
  } catch (error) {
    res.status(500).json({error: 'failed to sent otp'});
  }
}


module.exports = SendOtp;


