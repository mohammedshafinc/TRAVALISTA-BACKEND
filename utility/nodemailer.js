
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
  // eslint-disable-next-line no-unused-vars
async function sendmail(email, otp) {
  console.log(email);
  const message = {
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: 'OTP for email verification', // Subject line
    text: 'Hello world?', // plain text body
    html: `your otp for ${email} is ${otp}`, // html body
  };
  try {
    const info = await transporter.sendMail(message);
    console.log('message sent:%s ', info.messageId );
  } catch (err) {
    console.log('err in sendmail', err);
    throw new Error('klkl');
  }

//   console.log('Message sent: %s', info.messageId);
  // >
}

module.exports = sendmail;
