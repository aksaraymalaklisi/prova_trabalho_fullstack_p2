const mongoose = require('mongoose');

const motorcycleSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  cc: { type: Number, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Motorcycle', motorcycleSchema);
