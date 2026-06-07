const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SocksCo API is running' });
});

// MongoDB connection + seed data
const connectAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socksco');
    console.log('MongoDB connected');

    // Auto-seed if empty
    const Product = require('./models/Product');
    const count = await Product.countDocuments();
    if (count === 0) {
      const { products } = require('./data/seed');
      await Product.insertMany(products);
      console.log(`Seeded ${products.length} products`);
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Running without database - using in-memory data');
  }
};

connectAndSeed();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
