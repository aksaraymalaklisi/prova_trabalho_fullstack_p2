const ClothingBrand = require('../models/ClothingBrand');

const createClothingBrand = async (req, res) => {
  try {
    const clothingBrand = new ClothingBrand(req.body);
    await clothingBrand.save();
    res.status(201).json(clothingBrand);
  } catch (error) {
    res.status(400).json({ message: 'Error creating clothing brand', error: error.message });
  }
};

const getClothingBrands = async (req, res) => {
  try {
    const clothingBrands = await ClothingBrand.find();
    res.json(clothingBrands);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clothing brands', error: error.message });
  }
};

const getClothingBrandById = async (req, res) => {
  try {
    const clothingBrand = await ClothingBrand.findById(req.params.id);
    if (!clothingBrand) return res.status(404).json({ message: 'Clothing brand not found' });
    res.json(clothingBrand);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clothing brand', error: error.message });
  }
};

const updateClothingBrand = async (req, res) => {
  try {
    const clothingBrand = await ClothingBrand.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!clothingBrand) return res.status(404).json({ message: 'Clothing brand not found' });
    res.json(clothingBrand);
  } catch (error) {
    res.status(400).json({ message: 'Error updating clothing brand', error: error.message });
  }
};

const deleteClothingBrand = async (req, res) => {
  try {
    const clothingBrand = await ClothingBrand.findByIdAndDelete(req.params.id);
    if (!clothingBrand) return res.status(404).json({ message: 'Clothing brand not found' });
    res.json({ message: 'Clothing brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting clothing brand', error: error.message });
  }
};

module.exports = { createClothingBrand, getClothingBrands, getClothingBrandById, updateClothingBrand, deleteClothingBrand };
