const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.razorpayKey_id,
  key_secret: process.env.razorpaySecret_key,
});

