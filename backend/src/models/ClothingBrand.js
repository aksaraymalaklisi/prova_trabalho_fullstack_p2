const mongoose = require('mongoose');

const clothingBrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  foundedYear: { type: Number },
  website: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('ClothingBrand', clothingBrandSchema);
