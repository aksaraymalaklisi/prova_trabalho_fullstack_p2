const Motorcycle = require('../models/Motorcycle');

const createMotorcycle = async (req, res) => {
  try {
    const motorcycle = new Motorcycle(req.body);
    await motorcycle.save();
    res.status(201).json(motorcycle);
  } catch (error) {
    res.status(400).json({ message: 'Error creating motorcycle', error: error.message });
  }
};

const getMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find();
    res.json(motorcycles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching motorcycles', error: error.message });
  }
};

const getMotorcycleById = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id);
    if (!motorcycle) return res.status(404).json({ message: 'Motorcycle not found' });
    res.json(motorcycle);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching motorcycle', error: error.message });
  }
};

const updateMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!motorcycle) return res.status(404).json({ message: 'Motorcycle not found' });
    res.json(motorcycle);
  } catch (error) {
    res.status(400).json({ message: 'Error updating motorcycle', error: error.message });
  }
};

const deleteMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByIdAndDelete(req.params.id);
    if (!motorcycle) return res.status(404).json({ message: 'Motorcycle not found' });
    res.json({ message: 'Motorcycle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting motorcycle', error: error.message });
  }
};

module.exports = { createMotorcycle, getMotorcycles, getMotorcycleById, updateMotorcycle, deleteMotorcycle };
