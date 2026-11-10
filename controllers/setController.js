const Set = require('../models/Set');

exports.getSets = async (req, res) => {
  try {
    const sets = await Set.find().populate('game', 'name');
    res.status(200).json(sets);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.addSet = async (req, res) => {
  try {
    const { name, game } = req.body;
    const newSet = new Set({ name, game });
    await newSet.save();
    res.status(201).json(newSet);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteSet = async (req, res) => {
  try {
    await Set.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Set deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};