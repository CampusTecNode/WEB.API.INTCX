// src/data/seeder.js
const { Users, Roles, UserRoles, Products, Categories } = require('../../src/data/models/index');

async function seedDatabase() {
    try {
      const roles = await Roles.bulkCreate([
        { name: 'admin', description: 'Administrator role' },
        { name: 'user', description: 'User role' },
      ]);
  
      const categories = await Categories.bulkCreate([
        { Name: 'Electronics', Description: 'Electronic devices' },
        { Name: 'Books', Description: 'Books of all genres' },
        { Name: 'Clothing', Description: 'Men and Women clothing' },
      ]);
  
      const users = await Users.bulkCreate([
        {
          username: 'admin',
          email: 'admin@example.com',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: '1234567890',
          phoneConfirmed: true,
        },
        {
          username: 'user',
          email: 'user@example.com',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: '0987654321',
          phoneConfirmed: false,
        },
      ]);
  
      await Products.bulkCreate([
        { Name: 'Laptop', Description: 'A powerful laptop', Price: 1000.00, Stock: 50, CategoryID: 1, ImageURL: 'ruta' },
        { Name: 'Smartphone', Description: 'Latest model', Price: 700.00, Stock: 100, CategoryID: 1, ImageURL: 'ruta' },
        { Name: 'Novel Book', Description: 'A great book', Price: 20.00, Stock: 200, CategoryID: 2, ImageURL: 'ruta' },
        { Name: 'T-shirt', Description: 'Comfortable T-shirt', Price: 10.00, Stock: 300, CategoryID: 2, ImageURL: 'ruta' },
      ]);
  
      await UserRoles.bulkCreate([
        { userId: users[0].id, roleId: roles[0].id }, 
        { userId: users[1].id, roleId: roles[1].id }, 
      ]);
  
      console.log('Seeding completed successfully');
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }
  
  module.exports = seedDatabase;