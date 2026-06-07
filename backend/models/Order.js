const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  size: String,
  quantity: { type: Number, required: true, min: 1 },
  image: String,
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  subtotal: Number,
  shipping: Number,
  total: Number,
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  status: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered'] },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
