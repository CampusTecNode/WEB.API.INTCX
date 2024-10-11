const request = require('supertest');
const app = require('../../app'); 
const { CartStatus, Users } = require('../../src/data/models/index'); 

jest.mock('../../src/data/models/index'); 

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

describe('CartStatus Controller', () => {

    it('should retrieve all cart statuses', async () => {
        CartStatus.findAll.mockResolvedValue([
            { ID: 1, Name: 'Activo', CreatedAt: new Date(), CreatedBy: 'admin' },
            { ID: 2, Name: 'Procesado', CreatedAt: new Date(), CreatedBy: 'admin' }
        ]);

        const response = await request(app)
            .get('/cartStatus')
            .set('Authorization', `${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(2);
    });

    it('should retrieve a cart status by ID', async () => {
        const cartStatusMock = {
            ID: 1,
            Name: 'Activo',
            CreatedAt: new Date(),
            CreatedBy: 'admin'
        };
        CartStatus.findByPk.mockResolvedValue(cartStatusMock);

        const response = await request(app)
            .get('/cartStatus/1')
            .set('Authorization', `${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.ID).toBe(1);
        expect(response.body.Name).toBe('Activo');
    });

    it('should return 404 if cart status not found', async () => {
        CartStatus.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .get('/cartStatus/999')
            .set('Authorization', `${token}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('CartStatus Not Found');
    });

    it('should create a new cart status', async () => {
        const newCartStatus = {
            Name: 'Cancelado',
        };

        CartStatus.create.mockResolvedValue({ID: 5, ...newCartStatus});

        const response = await request(app)
            .post('/cartStatus')
            .set('Authorization', `${token}`)
            .send(newCartStatus);

        console.log("Response Body: ", response.body);

        expect(response.statusCode).toBe(201);
        expect(response.body.Name).toBe('Cancelado');
    });

    it('should update an existing cart status', async () => {
        const updatedOrderStatus = { ID: 1, Name: 'Updated Status' };
        CartStatus.findByPk.mockResolvedValue({
            ID: 1,
            Name: 'Activo',
            save: jest.fn().mockResolvedValue(updatedOrderStatus)
        });

        const response = await request(app)
            .put('/cartStatus/1')
            .set('Authorization', `${token}`)
            .send({ Name: 'Updated Status' });

        expect(response.statusCode).toBe(200);
        expect(response.body.Name).toBe('Updated Status');
    });

    it('should perform a soft delete on a cart status', async () => {
        const cartStatusMock = {
            ID: 1,
            Name: 'Activo',
            DeletedAt: null,
            DeletedBy: null,
            save: jest.fn(),
        };
        CartStatus.findByPk.mockResolvedValue(cartStatusMock);

        const response = await request(app)
            .delete('/cartStatus/1')
            .set('Authorization', `${token}`)
            .send({ deletedBy: 'admin' });

        expect(response.statusCode).toBe(200);
        expect(cartStatusMock.DeletedAt).not.toBeNull();
        expect(cartStatusMock.DeletedBy).toBe('admin');
        expect(cartStatusMock.save).toHaveBeenCalled();
    });
});
