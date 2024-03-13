const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,

  },
  food: {
    type: Boolean,
    required: true,
  },
  accomodation: {
    type: Boolean,
    required: true,
  },
  activities: {
    type: Boolean,
    required: true,
  },
  activityCount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  files: {
    type: String,
    required: true,
  },
  guideId: {
    type: mongoose.Types.ObjectId,
  },

});

const Package = mongoose.model('packages', guideSchema);
module.exports = Package;
