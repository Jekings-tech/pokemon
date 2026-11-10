const express = require('express');
const router = express.Router();
const { getSets, addSet, deleteSet } = require('../controllers/setController');

router.get('/', getSets);
router.post('/', addSet);
router.delete('/:id', deleteSet);
module.exports = router;