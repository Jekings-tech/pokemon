const Game = require('../models/Game');
const Set = require('../models/Set');

exports.seedData = async () => {
  try {
    // 1. Seed Games
    const gameCount = await Game.countDocuments();
    let pokemon, riftbound, onePiece;

    if (gameCount === 0) {
      pokemon = await Game.create({ name: 'Pokémon TCG', image: 'https://via.placeholder.com/150' });
      riftbound = await Game.create({ name: 'Riftbound TCG', image: 'https://via.placeholder.com/150' });
      onePiece = await Game.create({ name: 'One Piece Card Game', image: 'https://via.placeholder.com/150' });
      console.log('✅ 3 Games auto-seeded');
    } else {
      pokemon = await Game.findOne({ name: 'Pokémon TCG' });
      riftbound = await Game.findOne({ name: 'Riftbound TCG' });
      onePiece = await Game.findOne({ name: 'One Piece Card Game' });
    }

    // 2. Seed Sets
    const setCount = await Set.countDocuments();
    if (setCount === 0) {
      const sets = [
        // Pokémon
        { name: 'Surging Sparks', game: pokemon._id },
        { name: 'Stellar Crown', game: pokemon._id },
        { name: 'Twilight Masquerade', game: pokemon._id },
        { name: 'Temporal Forces', game: pokemon._id },
        { name: 'Paradox Rift', game: pokemon._id },
        { name: 'Obsidian Flames', game: pokemon._id },
        { name: 'Paldea Evolved', game: pokemon._id },
        { name: 'Scarlet & Violet Base Set', game: pokemon._id },
        { name: 'Silver Tempest', game: pokemon._id },
        { name: 'Lost Origin', game: pokemon._id },
        { name: 'Astral Radiance', game: pokemon._id },
        { name: 'Brilliant Stars', game: pokemon._id },
        { name: 'Fusion Strike', game: pokemon._id },
        { name: 'Evolving Skies', game: pokemon._id },
        { name: 'Chilling Reign', game: pokemon._id },
        { name: 'Prismatic Evolutions', game: pokemon._id },
        { name: 'Shrouded Fable', game: pokemon._id },
        { name: 'Paldean Fates', game: pokemon._id },
        { name: 'Scarlet & Violet—151', game: pokemon._id },
        { name: 'Crown Zenith', game: pokemon._id },
        { name: 'Pokémon GO', game: pokemon._id },
        { name: 'Celebrations 25th Anniversary', game: pokemon._id },
        // Riftbound
        { name: 'Origins', game: riftbound._id },
        { name: 'Spiritforged', game: riftbound._id },
        { name: 'Unleashed', game: riftbound._id },
        { name: 'Vendetta', game: riftbound._id },
        { name: 'Radiance', game: riftbound._id },
        { name: 'Legacy', game: riftbound._id },
        { name: 'The Reckoning', game: riftbound._id },
        { name: 'Proving Grounds', game: riftbound._id },
        { name: 'Worlds Bundle 2025', game: riftbound._id },
        { name: 'Lunar Revel Bundle 2026', game: riftbound._id },
        { name: 'Secret Garden', game: riftbound._id },
        { name: 'Gift of the Rift', game: riftbound._id },
        { name: 'Arcane', game: riftbound._id },
        { name: 'K/DA Couture', game: riftbound._id },
        { name: 'T1 2025 Worlds Champion', game: riftbound._id },
        { name: 'Legacy Sanctum', game: riftbound._id },
        // One Piece
        { name: 'OP-01: Romance Dawn', game: onePiece._id },
        { name: 'OP-02: Paramount War', game: onePiece._id },
        { name: 'OP-03: Pillars of Strength', game: onePiece._id },
        { name: 'OP-04: Kingdoms of Intrigue', game: onePiece._id },
        { name: 'OP-05: Awakening of the New Era', game: onePiece._id },
        { name: 'OP-06: Wings of the Captain', game: onePiece._id },
        { name: 'OP-07: 500 Years in the Future', game: onePiece._id },
        { name: 'OP-08: Two Legends', game: onePiece._id },
        { name: 'OP-09: Emperors in the New World', game: onePiece._id },
        { name: 'OP-10: Royal Blood', game: onePiece._id },
        { name: 'OP-11: A Fist of Divine Speed', game: onePiece._id },
        { name: 'OP-12: Legacy of the Master', game: onePiece._id },
        { name: 'OP-13: Carrying On His Will', game: onePiece._id },
        { name: 'OP-14: The Azure Sea\'s Seven', game: onePiece._id },
        { name: 'OP-15: Adventure on Kami\'s Island', game: onePiece._id },
        { name: 'OP-16: The Time of Battle', game: onePiece._id },
        { name: 'OP-17: The World\'s Strongest Warriors', game: onePiece._id },
        { name: 'EB-01: Memorial Collection', game: onePiece._id },
        { name: 'EB-02: Anime 25th Collection', game: onePiece._id },
        { name: 'EB-03: Heroine\'s Edition', game: onePiece._id },
        { name: 'EB-04: Heroine\'s Edition Vol. 2', game: onePiece._id },
        { name: 'PRB-01: Premium Booster - The Best Vol. 1', game: onePiece._id },
        { name: 'PRB-02: Premium Booster - The Best Vol. 2', game: onePiece._id },
        { name: 'DP-01: Double Pack Set Vol. 1', game: onePiece._id },
        { name: 'DP-02: Double Pack Set Vol. 2', game: onePiece._id },
        { name: 'DP-03: Double Pack Set Vol. 3', game: onePiece._id },
        { name: 'DP-04: Double Pack Set Vol. 4', game: onePiece._id },
        { name: 'DP-05: Double Pack Set Vol. 5', game: onePiece._id },
        { name: 'GB-01: Gift Box 2023', game: onePiece._id },
        { name: 'GB-02: Gift Box 2024', game: onePiece._id },
        { name: 'Best Selection Vol. 1', game: onePiece._id },
        { name: 'Film Red Edition', game: onePiece._id },
        { name: '1st Anniversary Set', game: onePiece._id },
        { name: 'ST-10: Ultimate Deck', game: onePiece._id },
        { name: 'ST-13: Ultra Deck', game: onePiece._id },
        { name: 'ST-14: 3D2Y Starter Deck', game: onePiece._id },
        { name: 'ST-15 to ST-20 Display Bundle', game: onePiece._id },
        { name: 'ST-31: RED Monkey D. Luffy', game: onePiece._id },
        { name: 'ST-32: GREEN Roronoa Zoro', game: onePiece._id },
        { name: 'ST-33: BLUE Kuzan', game: onePiece._id }
      ];
      
      await Set.insertMany(sets);
      console.log('✅ Sets auto-seeded');
    }
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  }
};