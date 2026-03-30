const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  category: { type: String, required: true },
  isPrime: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

productSchema.index({ title: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
