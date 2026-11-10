const Game = require('../models/Game');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updateGameImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image required' });
    
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'tcg_games' }, (error, result) => {
        if (error) reject(error); else resolve(result);
      });
      stream.end(req.file.buffer);
    });

    const game = await Game.findByIdAndUpdate(req.params.id, { image: result.secure_url }, { new: true });
    res.status(200).json(game);
  } catch (error) { res.status(500).json({ message: error.message }); }
};