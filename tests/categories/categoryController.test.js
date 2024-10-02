const request = require('supertest');
const app = require('../../app'); // Importa la aplicación
const {Categories, Users} = require('../../src/data/models/index'); // Mock del modelo de productos

jest.mock('../../src/data/models/index'); // Mock del modelo de categorías
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

  token = loginResponse.body.token; 
  console.log(token);
});

afterAll(async () => {
  const sequelize = require('../../src/data/connection');
  await sequelize.close();
});

describe('Category Controller', () => {
  it('should return a list of categories', async () => {
    Categories.findAll.mockResolvedValue([
      { id: 1, name: 'Electronics', description: 'Devices' },
      { id: 2, name: 'Books', description: 'All kinds of books' },
    ]);

    const response = await request(app)
      .get('/categories')
      .set('authorization', `${token}`); // Añadir el token en el encabezado

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  it('should create a new category', async () => {
    const newCategory = { name: 'Clothing', description: 'Clothes for everyone' };

    Categories.create.mockResolvedValue({ id: 3, ...newCategory });

    const response = await request(app)
      .post('/categories')
      .set('Authorization', `${token}`) // Añadir el token en el encabezado
      .send(newCategory);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newCategory.name);
  });
});
