const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function SendOtp(phoneNumber) {
  console.log('sunnni');
  try {
    console.log('hello');
    await client.verify.v2.services(process.env.SERVICE_ID)
        .verifications
        .create({to: `+91${phoneNumber}`, channel: 'sms'});
    return true;
  } catch (error) {
    console.log('twilio error', error);
  }
}
module.exports = SendOtp;
