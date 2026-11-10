const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Set', setSchema);