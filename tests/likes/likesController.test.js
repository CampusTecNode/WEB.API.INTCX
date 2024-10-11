const request = require('supertest');
const app = require('../../app'); // Importa tu aplicación
const { UserLikedProducts, Users, Products } = require('../../src/data/models/index');

jest.mock('../../src/data/models/index'); // Mock del modelo de productos

let token; // Variable para almacenar el token

beforeAll(async () => {
  // Mockear la autenticación para obtener el token
  Users.findOne.mockResolvedValue({
    id: 1,
    username: 'admin',
    password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa', // Hash de "password123"
  });

  // Hacer login para obtener el token
  const loginResponse = await request(app)
    .post('/auth/login')
    .send({ username: 'admin', password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa' });

  token = loginResponse.body.token; // Guardar el token para usarlo en las solicitudes
});

afterAll(async () => {
  const sequelize = require('../../src/data/connection');
  await sequelize.close();
});

describe('UserLikedProducts Controller', () => {

  it('should mark a product as liked by the user', async () => {
    UserLikedProducts.findOne.mockResolvedValue(null); // No hay like existente
    UserLikedProducts.create.mockResolvedValue({
      UserID: 1,
      ProductID: 1,
    });

    const response = await request(app)
      .post('/likes/like')
      .set('Authorization', `${token}`)
      .send({ UserID: 1, ProductID: 1 });

    expect(response.statusCode).toBe(201);
    expect(response.body.UserID).toBe(1);
    expect(response.body.ProductID).toBe(1);
  });

  it('should not allow a product to be liked twice by the same user', async () => {
    UserLikedProducts.findOne.mockResolvedValue({
      UserID: 1,
      ProductID: 1,
    });

    const response = await request(app)
      .post('/likes/like')
      .set('Authorization', `${token}`)
      .send({ UserID: 1, ProductID: 1 });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Product already liked');
  });

  it('should remove a like from a product', async () => {
    UserLikedProducts.findOne.mockResolvedValue({
      destroy: jest.fn(),
    });

    const response = await request(app)
      .post('/likes/unlike')
      .set('Authorization', `${token}`)
      .send({ UserID: 1, ProductID: 1 });

    expect(response.statusCode).toBe(204);
  });

  it('should return 404 if trying to remove a like that does not exist', async () => {
    UserLikedProducts.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/likes/unlike')
      .set('Authorization', `${token}`)
      .send({ UserID: 1, ProductID: 1 });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Like not found');
  });

  it('should retrieve all products liked by the user', async () => {
    Users.findByPk.mockResolvedValue({
      Products: [
        {
          ID: 1,
          Name: 'Notebook',
          Description: '200-page notebook',
          Price: 5.00,
        },
        {
          ID: 2,
          Name: 'Pen',
          Description: 'Blue ballpoint pen',
          Price: 1.00,
        },
      ],
    });

    const response = await request(app)
      .get('/likes/1/liked-products')
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].Name).toBe('Notebook');
    expect(response.body[1].Name).toBe('Pen');
  });

  it('should return 404 if user is not found when fetching liked products', async () => {
    Users.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .get('/likes/999/liked-products')
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});
