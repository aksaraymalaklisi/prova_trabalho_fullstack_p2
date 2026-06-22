const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

const sequelize = isTest
  ? new Sequelize('sqlite::memory:', { logging: false })
  : new Sequelize(process.env.POSTGRES_URI, {
      dialect: 'postgres',
      logging: false,
    });

module.exports = sequelize;
