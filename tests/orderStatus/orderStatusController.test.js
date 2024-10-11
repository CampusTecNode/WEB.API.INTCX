const request = require('supertest');
const app = require('../../app'); // Importa la aplicación
const { OrderStatus, Users } = require('../../src/data/models/index'); // Importa el modelo de estado de órdenes

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
});

afterAll(async () => {
  const sequelize = require('../../src/data/connection');
  await sequelize.close();
});

describe('OrderStatus Controller', () => {
  it('should return a list of order statuses', async () => {
    // Mock de los estados de órdenes
    OrderStatus.findAll.mockResolvedValue([
      { ID: 1, Name: 'Pending' },
      { ID: 2, Name: 'Paid' },
    ]);

    const response = await request(app)
      .get('/orderStatus')
      .set('Authorization', `${token}`); // Añadir el token en el encabezado

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].Name).toBe('Pending');
    expect(response.body[1].Name).toBe('Paid');
  });

  it('should return a specific order status by ID', async () => {
    // Mock de un estado de orden específico
    OrderStatus.findByPk.mockResolvedValue({ id: 1, Name: 'Pending' });
  
    const response = await request(app)
      .get('/orderStatus/1')
      .set('Authorization', `${token}`); // Añadir el token en el encabezado
  
    expect(response.statusCode).toBe(200);
    expect(response.body.Name).toBe('Pending');
  });

  it('should return 404 if order status is not found', async () => {
    // Mock de un estado no encontrado
    OrderStatus.findByPk.mockResolvedValue(null);
  
    const response = await request(app)
      .get('/orderStatus/999')
      .set('Authorization', `${token}`); // Añadir el token en el encabezado
  
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('OrderStatus Not Found');
  });

  it('should create a new order status', async () => {
    const newOrderStatus = { Name: 'Test Status' };

    // Mockear el método create
    OrderStatus.create.mockResolvedValue({ ID: 5, ...newOrderStatus });

    const response = await request(app)
      .post('/orderStatus')
      .set('Authorization', `${token}`)
      .send(newOrderStatus);

    expect(response.statusCode).toBe(201);
    expect(response.body.Name).toBe('Test Status');
  });

  it('should update an existing order status', async () => {
    // Mockear el método findByPk
    const updatedOrderStatus = { ID: 1, Name: 'Order Staus Updated' };
    OrderStatus.findByPk.mockResolvedValue({
      ID: 1,
      Name: 'Credit Card',
      save: jest.fn().mockResolvedValue(updatedOrderStatus)
    });

    const response = await request(app)
      .put('/orderStatus/1')
      .set('Authorization', `${token}`)
      .send({ Name: 'Order Staus Updated' });

    expect(response.statusCode).toBe(200);
    expect(response.body.Name).toBe('Order Staus Updated');
  });

  it('should perform a soft delete on order status', async () => {
    // Mock de un estado de orden que será eliminado
    const orderStatus = {
      ID: 1,
      Name: 'Pending',
      DeletedAt: null,
      DeletedBy: null,
      save: jest.fn(), // Simulamos el método save
    };
  
    // Mockear la respuesta de findByPk para devolver un estado existente
    OrderStatus.findByPk.mockResolvedValue(orderStatus);
  
    const response = await request(app)
      .delete('/orderStatus/1')
      .send({ deletedBy: 'admin' }) // Mandar quién está eliminando
      .set('Authorization', `${token}`); // Añadir el token en el encabezado
  
    expect(response.statusCode).toBe(200); // Verificar que la respuesta sea exitosa
    expect(orderStatus.DeletedAt).not.toBeNull(); // Asegurarse de que se haya agregado la fecha de borrado
    expect(orderStatus.DeletedBy).toBe('admin'); // Asegurarse de que se haya asignado correctamente el campo DeletedBy
    expect(orderStatus.save).toHaveBeenCalled(); // Verificar que el registro haya sido guardado después del cambio
  });

});
