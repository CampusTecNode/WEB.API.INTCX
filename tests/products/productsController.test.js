const request = require('supertest');
const app = require('../../app'); // Importa la aplicación
const {Products, Users} = require('../../src/data/models/index'); // Mock del modelo de productos

jest.mock('../../src/data/models/index'); // Mock del modelo de productos
jest.mock('../../src/data/models/index'); // Mock del modelo de usuarios

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

describe('Product Controller', () => {
  // it('should return a list of products', async () => {
  //   Products.findAll.mockResolvedValue([
  //     { id: 1, name: 'Product 1', description: 'Description 1', price: 99.99 },
  //     { id: 2, name: 'Product 2', description: 'Description 2', price: 199.99 },
  //   ]);

  //   const response = await request(app)
  //     .get('/products')
  //     .set('authorization', `${token}`); // Añadir el token en el encabezado

  //   expect(response.statusCode).toBe(200);
  //   expect(Array.isArray(response.body)).toBe(true);
  //   expect(response.body.length).toBe(2);
  // });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Product 1',
      description: 'Description 1',
      price: 99.99,
    };

    Products.create.mockResolvedValue({ id: 1, ...newProduct });

    const response = await request(app)
      .post('/products')
      .set('Authorization', `${token}`) // Añadir el token en el encabezado
      .send(newProduct);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
  });
});
