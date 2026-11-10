const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true } // You will upload this
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);