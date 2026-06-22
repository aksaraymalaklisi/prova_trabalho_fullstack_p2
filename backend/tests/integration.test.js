const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const jwt = require('jsonwebtoken');

describe('API Integration Tests', () => {
  let adminToken;
  let userToken;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'supersecretjwtkey';

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@test.com',
      password: 'hashedpassword',
      role: 'admin',
    });
    
    const user = await User.create({
      name: 'User',
      email: 'user@test.com',
      password: 'hashedpassword',
      role: 'user',
    });

    adminToken = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    userToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  });

  describe('User Endpoints', () => {
    it('should fetch users if admin', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThanOrEqual(2);
    });

    it('should deny fetching users if regular user', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toEqual(403);
    });
  });

  describe('Car Endpoints', () => {
    it('should create a new car', async () => {
      const res = await request(app)
        .post('/api/cars')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          brand: 'Toyota',
          model: 'Corolla',
          year: 2020,
          price: 20000
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
    });

    it('should fetch all cars', async () => {
      await request(app)
        .post('/api/cars')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ brand: 'Honda', model: 'Civic', year: 2021, price: 22000 });

      const res = await request(app)
        .get('/api/cars')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
