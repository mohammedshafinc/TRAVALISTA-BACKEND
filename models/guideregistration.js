const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const guideSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,

  },
  exp: {
    type: Number,
    required: true,
  },
  files: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pinccode: {
    type: Number,
  },
  guideId: {
    type: mongoose.Types.ObjectId,
  },

});
guideSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

const Guide = mongoose.model('guideregister', guideSchema);
module.exports = Guide;
