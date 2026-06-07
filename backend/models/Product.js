const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  description: { type: String, required: true },
  category: { type: String, enum: ['ankle', 'crew', 'knee-high', 'no-show', 'compression'], required: true },
  gender: { type: String, enum: ['men', 'women', 'unisex'], required: true },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  images: [{ type: String }],
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
