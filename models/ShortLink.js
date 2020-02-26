const mongoose = require('mongoose');

const shortLinkSchema = new mongoose.Schema({
  fullLink: {
    type: String,
    required: true
  },
  shortLink: {
    type: String
  },
  clicks: {
    type: Number
  }
});

module.exports = shortLink = mongoose.model('shortLink', shortLinkSchema);
