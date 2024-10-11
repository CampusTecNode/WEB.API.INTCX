// tests/auth/authController.test.js
const request = require('supertest');
const app = require('../../app'); 
const { Users } = require('../../src/data/models/index'); 

jest.mock('../../src/data/models/index');

describe('Auth Controller', () => {
  afterAll(async () => {
    const sequelize = require('../../src/data/connection');
    await sequelize.close();
  });

  it('should return a token for valid credentials', async () => {
    Users.findOne.mockResolvedValue({
      id: 1,
      username: 'admin',
      password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa', 
    });

    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa' });

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined(); // Verifica que se haya devuelto un token
  });

  it('should return 401 for invalid credentials', async () => {
    Users.findOne.mockResolvedValue(null); // No encuentra usuario

    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'invalidUser', password: 'invalidPassword' });

    expect(response.statusCode).toBe(401);
  });

  it('should return 201 for succesfully register user', async () => {
    Users.create.mockResolvedValue({
      username: 'test',
      email: 'testemail@test.com',
      password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa', 
    });

    const response = await request(app)
      .post('/auth/register')
      .send({ username: 'test', email: 'testemail@test.com', password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa' });

    console.log(response.body);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User registered successfully'); // Verifica que se haya devuelto un token
  });


});
