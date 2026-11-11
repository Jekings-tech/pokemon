const Game = require('../models/Game');

exports.seedData = async () => {
  try {
    const gameCount = await Game.countDocuments();

    if (gameCount === 0) {
      await Game.create({ name: 'Pokémon TCG', image: 'https://via.placeholder.com/150' });
      await Game.create({ name: 'Riftbound TCG', image: 'https://via.placeholder.com/150' });
      await Game.create({ name: 'One Piece Card Game', image: 'https://via.placeholder.com/150' });
      console.log('✅ 3 Games auto-seeded');
    } else {
      console.log('✅ Games already exist — skipping seed');
    }
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  }
};