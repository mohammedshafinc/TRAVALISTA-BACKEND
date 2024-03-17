/* eslint-disable max-len */

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
  let html;
  let subject;
  if (otp == 'verification') {
    subject = `Welcome Email from Travalista`;
    html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; margin: 0 auto; max-width: 600px; padding: 20px;">
          <p>Hi Guide,</p>
          <p>Thank you for registering as a guide on our platform!</p>
          <p>We're excited to welcome you and look forward to reviewing your application.</p>
          <p><b>Please note:</b> Your account is currently under review and will be activated upon admin approval.</p>
          <p>We will notify you via email once your account is approved and you can start sharing your expertise with our users.</p>
          <p>Thank you for your patience!</p>
          <p>Sincerely,</p>
          <p>The Travalista Team</p>
        </div>
      `;
  } else if (otp == 'isAccept') {
    subject = `verification status from Admin`;
    html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; margin: 0 auto; max-width: 600px; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333333;">Welcome Back!</h2>
    <p style="color: #666666;">We're excited to inform you that your request has been accepted by the admin.</p>
    <p style="color: #666666;">You can now log in to your account and start using our platform.</p>
    <p style="color: #666666;">Here are a few things you can do:</p>
    <ul style="color: #666666;">
      <li>Share your expertise and experiences with our users.</li>
      <li>Connect with fellow guides and travelers.</li>
      <li>Explore opportunities to enrich your profile.</li>
    </ul>
    <p style="color: #666666;">Welcome aboard! We're thrilled to have you with us.</p>
    <p style="color: #666666;">Best regards,</p>
    <p style="color: #666666;">The Travalista Team</p>
  </div>
    `;
  } else if (otp == 'isReject') {
    subject = `verification status from Admin`;
    html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; margin: 0 auto; max-width: 600px; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333333;">We're Sorry!</h2>
    <p style="color: #666666;">We regret to inform you that your request has been rejected by the admin.</p>
    <p style="color: #666666;">If you have any questions or concerns, please feel free to reach out to us.</p>
    <p style="color: #666666;">Thank you for your understanding.</p>
    <p style="color: #666666;">Best regards,</p>
    <p style="color: #666666;">The Travalista Team</p>
  </div>`;
  } else {
    subject = `OTP for Travalista Email verification`;
    html =`
      <html>
        <head>
          <style>
            /* Add your styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333333;
            }
            p {
              color: #666666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>OTP for Email Verification</h1>
            <p>Your OTP for ${email} is <strong>${otp}</strong>.</p>
          </div>
        </body>
      </html>
    `;
  }
  console.log(email);
  const message = {
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: 'Hello world?', // plain text body
    html: html,
  };
  try {
    await transporter.sendMail(message);
    // console.log('message sent:%s ', info.messageId );
  } catch (err) {
    console.log('err in sendmail', err);
    throw new Error('klkl');
  }

//   console.log('Message sent: %s', info.messageId);
  // >
}

module.exports = sendmail;
