const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { products: seedData } = require('../data/seed');

// Helper: check if mongoose is connected
const isDbConnected = () => {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1;
};

// GET /api/products — list with filters
router.get('/', async (req, res) => {
  try {
    const { category, gender, minPrice, maxPrice, featured, search } = req.query;

    if (!isDbConnected()) {
      // Fallback: filter in-memory seed data
      let data = seedData;
      if (category) data = data.filter(p => p.category === category);
      if (gender) data = data.filter(p => p.gender === gender || p.gender === 'unisex');
      if (minPrice) data = data.filter(p => p.price >= Number(minPrice));
      if (maxPrice) data = data.filter(p => p.price <= Number(maxPrice));
      if (featured === 'true') data = data.filter(p => p.featured);
      if (search) data = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      return res.json(data.map((p, i) => ({ ...p, _id: String(i + 1) })));
    }

    const query = {};
    if (category) query.category = category;
    if (gender && gender !== 'all') query.$or = [{ gender }, { gender: 'unisex' }];
    if (featured === 'true') query.featured = true;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/featured
router.get('/featured', async (req, res) => {
  try {
    if (!isDbConnected()) {
      const featured = seedData.filter(p => p.featured).map((p, i) => ({ ...p, _id: String(i + 1) }));
      return res.json(featured);
    }
    const products = await Product.find({ featured: true }).limit(6);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    if (!isDbConnected()) {
      const idx = Number(req.params.id) - 1;
      if (seedData[idx]) return res.json({ ...seedData[idx], _id: req.params.id });
      return res.status(404).json({ error: 'Product not found' });
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
