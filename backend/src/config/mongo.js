const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectMongo = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    if (process.env.NODE_ENV !== 'test') {
      console.log('MongoDB connected successfully');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const disconnectMongo = async () => {
  await mongoose.disconnect();
};

module.exports = { connectMongo, disconnectMongo };
