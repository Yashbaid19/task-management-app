jest.setTimeout(20000); // allow up to 20 seconds
const request = require('supertest');
const app = require('../server'); // path to your Express app

let token;
let taskId;
const mongoose = require('mongoose');
const connectDB = require('../config/db');

beforeAll(async () => {
  await connectDB();
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe('🚀 Full API Coverage', () => {
  const testUser = {
    name: 'Test User',
    email: `testuser${Date.now()}@mail.com`, // unique email
    password: 'password123',
  };

  // ✅ Register a test user
  it('should register a new user and return token', async () => {
    const res = await request(app).post('/api/users/register').send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  // ✅ Login with same user
  it('should login and return token', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token; // overwrite just to confirm it still works
  });

  // ✅ Create a task
  it('should create a task with valid token', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Write tests',
        description: 'Automate all the APIs',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Write tests');
    taskId = res.body._id;
  });

  // ✅ Fetch tasks
  it('should retrieve tasks for authenticated user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ✅ Update task
  it('should update the task status', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'completed' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('completed');
  });

  // ✅ Delete task
  it('should delete the task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  // ❌ Reject task creation with no token
  it('should reject task creation without token', async () => {
    const res = await request(app).post('/api/tasks').send({
      title: 'No token task',
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/no token/i);
  });

  // ❌ Reject with invalid token
  it('should reject access with an invalid token', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', 'Bearer fake.jwt.token');
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/invalid token/i);
  });
});