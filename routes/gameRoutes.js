const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { getGames, updateGameImage } = require('../controllers/gameController');

router.get('/', getGames);
router.put('/:id', upload.single('image'), updateGameImage);
module.exports = router;