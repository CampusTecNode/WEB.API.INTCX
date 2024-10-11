const request = require('supertest');
const app = require('../../app'); // Importa la aplicación
const { Orders, ShoppingCart, CartDetails, OrderDetails, Products, PaymentMethods, OrderStates, Users } = require('../../src/data/models/index');

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

describe('Orders Controller', () => {

  it('should create an order from an existing shopping cart', async () => {

    const updatedShoppingCart = {
        ID: 1,
        Total: 100.00,
        PaymentMethodID: 1,
        CartDetails: [
          { ProductID: 1, Count: 2, UnitPrice: 5.00 },
          { ProductID: 2, Count: 1, UnitPrice: 90.00 }
        ],
        CartStatusID: 2
      }

    ShoppingCart.findByPk.mockResolvedValue({
      ID: 1,
      Total: 100.00,
      PaymentMethodID: 1,
      CartDetails: [
        { ProductID: 1, Count: 2, UnitPrice: 5.00 },
        { ProductID: 2, Count: 1, UnitPrice: 90.00 }
      ],
      save: jest.fn().mockResolvedValue(updatedShoppingCart)
    });

    Orders.create.mockResolvedValue({
      ID: 1,
      UserID: 1,
      Total: 100.00,
      Date: new Date(),
      StateID: 1,
      PaymentMethodID: 1,
      CartID: 1
    });

    const response = await request(app)
      .post('/orders')
      .set('Authorization', `${token}`)
      .send({ cartID: 1, userID: 1 });

    expect(response.statusCode).toBe(201);
    expect(response.body.ID).toBe(1);
  });

  it('should retrieve all orders with details', async () => {
    Orders.findAll.mockResolvedValue([
      {
        ID: 1,
        UserID: 1,
        Date: new Date(),
        Total: 100.00,
        StateID: 1,
        PaymentMethodID: 1,
        OrderDetails: [
          { ProductID: 1, Count: 2, UnitPrice: 5.00, Product: { Name: 'Product 1' } }
        ],
        OrderState: { ID: 1, Name: 'Pending' },
        PaymentMethod: { ID: 1, Name: 'Credit Card' }
      }
    ]);

    const response = await request(app)
      .get('/orders')
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].OrderDetails.length).toBe(1);
  });

  it('should retrieve orders by user', async () => {
    Orders.findAll.mockResolvedValue([
      {
        ID: 1,
        UserID: 1,
        Date: new Date(),
        Total: 100.00,
        StateID: 1,
        PaymentMethodID: 1,
        OrderDetails: [
          { ProductID: 1, Count: 2, UnitPrice: 5.00, Product: { Name: 'Product 1' } }
        ],
        OrderState: { ID: 1, Name: 'Pending' },
        PaymentMethod: { ID: 1, Name: 'Credit Card' }
      }
    ]);

    const response = await request(app)
      .get('/orders/user/1')
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].UserID).toBe(1);
  });

  it('should soft delete an order', async () => {
    Orders.findByPk.mockResolvedValue({
      ID: 1,
      save: jest.fn(),
      DeletedAt: null,
      DeletedBy: null
    });

    const response = await request(app)
      .delete('/orders/1')
      .set('Authorization', `${token}`)
      .send({ deletedBy: 'admin' });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Order deleted (soft delete)');
  });

});
