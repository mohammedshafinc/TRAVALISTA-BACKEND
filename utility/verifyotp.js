
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// eslint-disable-next-line require-jsdoc
async function verityOtp(phoneNumber, otp) {
  console.log('suuuiiiiii');
  try {
    client.verify.v2.services(process.env.SERVICE_ID)
        .verificationChecks
        .create({to: `+91${phoneNumber}`, code: `${otp}`})
        .then((verificationCheck) => console.log(verificationCheck.status));
  } catch (error) {
    console.log('error in verify otp', error);
  }
}

module.exports = verityOtp;
