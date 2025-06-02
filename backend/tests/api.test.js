const request = require('supertest');
const app = require('../server'); // Adjust if server.js exports app
const mongoose = require('mongoose');

describe('API Endpoints', () => {
  let token;
  let roomId;
  let bookingId;

  beforeAll(async () => {
    // Connect to test DB or use existing connection
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should login user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should create a room (admin)', async () => {
    // Create admin user and get token or use existing admin token
    // For simplicity, skipping admin auth here
    const res = await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Room',
        description: 'A nice room',
        price: 100,
        maxCount: 2,
        imageUrls: ['https://via.placeholder.com/300'],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    roomId = res.body._id;
  });

  it('should create a booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        roomId,
        fromDate: '2024-07-01',
        toDate: '2024-07-05',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    bookingId = res.body._id;
  });

  it('should cancel a booking', async () => {
    const res = await request(app)
      .put(`/api/bookings/cancel/${bookingId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Booking cancelled');
  });
});
