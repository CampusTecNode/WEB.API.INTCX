const request = require('supertest');
const app = require('../../app'); // Importa la aplicación
const {Categories, Users, UserLikedProducts} = require('../../src/data/models/index'); // Mock del modelo de productos

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

  // it('should return a list of categories with IsLiked property', async () => {
  //   // Mock de categorías y productos
  //   Categories.findAll.mockResolvedValueOnce([
  //     {
  //       id: 1,
  //       name: 'Electronics',
  //       description: 'Devices',
  //       Products: [
  //         { id: 1, Name: 'Laptop', Description: 'A powerful laptop', Price: 1000.00 },
  //         { id: 2, Name: 'Smartphone', Description: 'Latest model', Price: 700.00 }
  //       ]
  //     },
  //     {
  //       id: 2,
  //       name: 'Books',
  //       description: 'All kinds of books',
  //       Products: [
  //         { ID: 3, Name: 'Novel Book', Description: 'A great novel', Price: 20.00 }
  //       ]
  //     }
  //   ]);

  //   UserLikedProducts.findAll.mockResolvedValue([
  //     { ProductID: 1 }, // El usuario ha dado like al producto con ID 1 (Laptop)
  //   ]);

  //   const userID = 1; // Simular un userID

  //   const response = await request(app)
  //     .get(`/categories?userID=${userID}`)
  //     .set('Authorization', `${token}`); // Añadir el token en el encabezado

  //   console.log("Response Body: ", response.body);

  //   expect(response.statusCode).toBe(200);
  //   expect(Array.isArray(response.body)).toBe(true);
  //   expect(response.body.length).toBe(2);

  //   // Verificar que se ha añadido la propiedad IsLiked
  //   expect(response.body[0].Products[0].IsLiked).toBe(true); // Laptop tiene like
  //   expect(response.body[0].Products[1].IsLiked).toBe(false); // Smartphone no tiene like
  //   expect(response.body[1].Products[0].IsLiked).toBe(false); // Novel Book no tiene like
  // });

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
