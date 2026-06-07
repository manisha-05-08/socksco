const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders — place an order
router.post('/', async (req, res) => {
  try {
    const { items, subtotal, shipping, total, customer } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const order = new Order({ items, subtotal, shipping, total, customer });
    await order.save();

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: order._id,
      order,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id — get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
