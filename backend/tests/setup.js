const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sequelize = require('../src/config/database');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await sequelize.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
  
  const models = sequelize.models;
  for (const model in models) {
    await models[model].destroy({ where: {}, truncate: true, cascade: true });
  }
});
