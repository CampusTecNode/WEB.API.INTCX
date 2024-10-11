const request = require('supertest');
const app = require('../../app'); // Importa la aplicación
const { PaymentMethods, Users} = require('../../src/data/models/index'); // Mock del modelo de PaymentMethods

jest.mock('../../src/data/models/index'); // Mock de PaymentMethods

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
  });
  
  afterAll(async () => {
    const sequelize = require('../../src/data/connection');
    await sequelize.close();
  });

describe('PaymentMethods Controller', () => {

  it('should return a list of payment methods', async () => {
    // Mockear el método findAll de PaymentMethods
    PaymentMethods.findAll.mockResolvedValue([
      { ID: 1, Name: 'Credit Card' },
      { ID: 2, Name: 'Paypal' }
    ]);

    const response = await request(app)
      .get('/paymentMethods')
      .set('Authorization', `${token}`); // Añadir el token en el encabezado

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  it('should return a single payment method by ID', async () => {
    // Mockear el método findByPk
    PaymentMethods.findByPk.mockResolvedValue({ 
      ID: 1, 
      Name: 'Credit Card', 
      Description: 'Pay using a credit card' 
    });

    const response = await request(app)
      .get('/paymentMethods/1')
      .set('Authorization', `${token}`); // Añadir el token en el encabezado

    expect(response.statusCode).toBe(200);
    expect(response.body.Name).toBe('Credit Card');
  });

  it('should return 404 if payment method is not found', async () => {
    // Mockear el método findByPk para que devuelva null
    PaymentMethods.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .get('/paymentMethods/999') // Un ID que no existe
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('PaymentMethods Not Found not found');
  });

  it('should create a new payment method', async () => {
    const newPaymentMethods = { Name: 'Bank Transfer' };

    // Mockear el método create
    PaymentMethods.create.mockResolvedValue({ ID: 3, ...newPaymentMethods });

    const response = await request(app)
      .post('/paymentMethods')
      .set('Authorization', `${token}`)
      .send(newPaymentMethods);

    expect(response.statusCode).toBe(201);
    expect(response.body.Name).toBe('Bank Transfer');
  });

  it('should update an existing payment method', async () => {
    // Mockear el método findByPk
    const updatedPaymentMethods = { ID: 1, Name: 'Credit Card Updated' };
    PaymentMethods.findByPk.mockResolvedValue({
      ID: 1,
      Name: 'Credit Card',
      save: jest.fn().mockResolvedValue(updatedPaymentMethods)
    });

    const response = await request(app)
      .put('/paymentMethods/1')
      .set('Authorization', `${token}`)
      .send({ Name: 'Credit Card Updated' });

    expect(response.statusCode).toBe(200);
    expect(response.body.Name).toBe('Credit Card Updated');
  });

  it('should soft delete a payment method', async () => {
    // Mockear el método findByPk
    const paymentMethod = { 
      ID: 1, 
      Name: 'Credit Card', 
      save: jest.fn().mockResolvedValue(null) 
    };
    PaymentMethods.findByPk.mockResolvedValue(paymentMethod);

    const response = await request(app)
      .delete('/paymentMethods/1')
      .set('Authorization', `${token}`)
      .send({ deletedBy: 'admin' });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Payment Method deleted (soft delete)');
    expect(paymentMethod.save).toHaveBeenCalled();
  });
});
