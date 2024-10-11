const request = require('supertest');
const app = require('../../app');
const { Notifications, Users } = require('../../src/data/models/index');

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

describe('Notifications Controller', () => {
  
  it('should retrieve notifications by userID', async () => {
    // Mock de notificaciones para un usuario
    Notifications.findAll.mockResolvedValue([
      { ID: 1, Title: 'Welcome', Message: 'Thanks for joining!', Type: 'info', IsRead: false, CreatedAt: new Date() },
      { ID: 2, Title: 'Update', Message: 'System update available.', Type: 'alert', IsRead: true, CreatedAt: new Date() }
    ]);

    const response = await request(app)
      .get('/notifications/1')
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].Title).toBe('Welcome');
  });

  it('should return 404 if no notifications found for the user', async () => {
    Notifications.findAll.mockResolvedValue([]);

    const response = await request(app)
      .get('/notifications/1')
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('No notifications found for this user');
  });

  it('should create a new notification', async () => {
    const newNotification = {
      ID: 1,
      UserID: 1,
      Title: 'New Feature',
      Message: 'Check out our new feature!',
      Type: 'info',
      IsRead: false,
      CreatedBy: 'System',
    };
  
    Notifications.create.mockResolvedValue(newNotification);
  
    const response = await request(app)
      .post('/notifications')
      .set('Authorization', `${token}`)
      .send({
        UserID: 1,
        Title: 'New Feature',
        Message: 'Check out our new feature!',
        Type: 'info',
      });
  
    expect(response.statusCode).toBe(201);
    expect(response.body.Title).toBe('New Feature');
    expect(response.body.IsRead).toBe(false);
  });
  
});
