const request = require('supertest');
const app = require('../../app');
const { ShoppingCart, Users, Products, CartDetails } = require('../../src/data/models/index');

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

describe('ShoppingCart Controller', () => {

  it('should add a product to the cart or create a new cart if none exists', async () => {
    // Simulamos la respuesta de Users y Products
    Users.findByPk.mockResolvedValue({ ID: 1 });
    Products.findByPk.mockResolvedValue({ ID: 1, Price: 10.00 });

    // Simulamos que no existe un carrito activo
    ShoppingCart.findOne.mockResolvedValue(null);

    // Simulamos la creación de un nuevo carrito y un nuevo CartDetail
    ShoppingCart.create.mockResolvedValue({ ID: 1, UserID: 1, CartStateID: 1 });
    CartDetails.create.mockResolvedValue({ CartID: 1, ProductID: 1, Quantity: 2, UnitPrice: 10.00 });

    const response = await request(app)
      .post('/shoppingCart')
      .set('Authorization', `${token}`)
      .send({ UserID: 1, ProductID: 1, Quantity: 2 });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Product added to cart successfully');
  });

  it('should retrieve the active cart for a user', async () => {
    // Simulamos la respuesta de un carrito activo con detalles de productos
    ShoppingCart.findOne.mockResolvedValue({
      ID: 1,
      CartStateID: 1,
      CartDetails: [
        {
          ProductID: 1,
          Quantity: 2,
          UnitPrice: 10.00,
          Product: { Name: 'Product 1', Price: 10.00 }
        }
      ],
      CartStatus: { Name: 'Activo' }
    });
  
    const response = await request(app)
      .get('/shoppingCart/user/1')
      .set('Authorization', `${token}`);
  
    expect(response.statusCode).toBe(200);
    expect(response.body.CartDetails.length).toBe(1);
    expect(response.body.CartStatus.Name).toBe('Activo');
  });
  
  it('should remove a product from the cart and mark the cart as inactive if empty', async () => {
    // Simulamos la respuesta de un carrito activo y un CartDetail
    ShoppingCart.findOne.mockResolvedValue({
      ID: 1,
      CartStateID: 1,
      save: jest.fn()  // Mock de guardar el estado del carrito
    });
  
    CartDetails.findOne.mockResolvedValue({
      ID: 1,
      save: jest.fn()  // Mock de guardar el borrado lógico del CartDetail
    });
  
    // Simulamos que no hay más productos en el carrito
    CartDetails.findAll.mockResolvedValue([]);
  
    const response = await request(app)
      .delete('/shoppingCart/1/1')
      .set('Authorization', `${token}`)
      .send();
  
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Product removed and cart marked as inactive');
  });
  
});
