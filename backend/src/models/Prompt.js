// models/Prompt.js
const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  timesUsed: {
    type: Number,
    default: 1
  },
  lastUsedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prompt', promptSchema);
