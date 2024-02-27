const moongoose = require('mongoose');
const bcrypt = require('bcrypt');
const guideSchema = new moongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: Number,
    required: true,
    unique: true,

  },
  exp: {
    type: Number,
    required: true,
  },
  files: {
    type: String,
    required: true,
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

const Guide = moongoose.model('guideregister', guideSchema);
module.exports = Guide;
