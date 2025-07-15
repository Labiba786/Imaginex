const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', imageSchema);