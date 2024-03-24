const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const packageSchema = new Schema({
  razorpay_payment_id: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  userid: {
    type: mongoose.Types.ObjectId,
  },
  purchaseduser: {
    type: String,
  },
  purchaseuseremail: {
    type: String,
  },
  packageid: {
    type: mongoose.Types.ObjectId,
    ref: 'packages',
  },
});

const booking = mongoose.model('packagebookigs', packageSchema);
module.exports = booking;
