const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const gameRoutes = require('./routes/gameRoutes');
const setRoutes = require('./routes/setRoutes');
const productRoutes = require('./routes/productRoutes');
const { seedData } = require('./controllers/seedController');

const app = express();
app.use(cors());
app.use(express.json());

// Simple Login for Dashboard
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'tcg' && password === 'tcg2026') {
    res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.use('/api/games', gameRoutes);
app.use('/api/sets', setRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    seedData(); // <-- Auto-seeds games and sets
    app.listen(PORT, () => console.log(`🚀 TCG Vault Server on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB error:', err));