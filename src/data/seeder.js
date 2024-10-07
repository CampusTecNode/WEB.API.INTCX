// src/data/seeder.js
const { Users, Roles, UserRoles, Products, Categories, OrderStatus, PaymentMethods } = require('../../src/data/models/index');

async function seedDatabase() {
    try {

      const roles = await Roles.bulkCreate([
        { name: 'admin', description: 'Administrator role' },
        { name: 'student', description: 'Student role' },
        { name: 'cashier', description: 'Cashier role' },
      ]);
  
      const users = await Users.bulkCreate([
        {
          username: 'admin', // 1
          email: 'admin@example.com',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: '1234567890',
          phoneConfirmed: true,
        },
        {
          username: 'student', // 2
          email: 'student@student.com',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: '0987654321',
          phoneConfirmed: false,
        },
        {
          username: '1114102', // 3
          email: '1114102@est.intec.edu.do',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: '18492202181',
          phoneConfirmed: false,
        },
        {
          username: '1114226', // 4
          email: '1114226@est.intec.edu.do',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: '18298905382',
          phoneConfirmed: false,
        },
        {
          username: 'cashier', // 4
          email: 'cashier@inteconnect.com',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: 'XXXXXXXXXX',
          phoneConfirmed: false,
        },
      ]);

      await UserRoles.bulkCreate([
        { userId: users[0].id, roleId: roles[0].id }, 
        { userId: users[1].id, roleId: roles[1].id }, 
        { userId: users[2].id, roleId: roles[0].id }, 
        { userId: users[3].id, roleId: roles[0].id }, 
        { userId: users[4].id, roleId: roles[2].id }, 
      ]);

      await Categories.bulkCreate([
        { Name: 'Stationery', Description: 'Office and school supplies like notebooks, pens, and rulers' },
        { Name: 'Snacks', Description: 'Candy, chocolate, and other snacks' },
        { Name: 'Beverages', Description: 'Drinks like water, juice, and tea' },
        { Name: 'Tech Accessories', Description: 'Laptop sleeves, USB drives, and other tech accessories' },
        { Name: 'Backpacks', Description: 'School and university backpacks' },
        { Name: 'Calculators', Description: 'Graphing and scientific calculators' },
      ]);
    
      await Products.bulkCreate([
        { Name: 'Notebook', Description: '200-page notebook', Price: 5.00, Stock: 150, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Mechanical Pencil', Description: '0.5mm mechanical pencil', Price: 2.50, Stock: 200, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Ballpoint Pen', Description: 'Blue ballpoint pen', Price: 1.00, Stock: 300, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Highlighter Set', Description: 'Pack of 4 neon highlighters', Price: 4.00, Stock: 120, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Ruler', Description: '30 cm plastic ruler', Price: 0.80, Stock: 500, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Eraser', Description: 'Non-smudge eraser', Price: 0.50, Stock: 400, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Sharpener', Description: 'Metal pencil sharpener', Price: 1.20, Stock: 150, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Stapler', Description: 'Compact stapler with 1000 staples', Price: 8.00, Stock: 50, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Sticky Notes', Description: 'Pack of 100 sticky notes', Price: 2.00, Stock: 300, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Binder Clips', Description: 'Pack of 10 medium-sized binder clips', Price: 3.50, Stock: 200, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Whiteboard Markers', Description: 'Set of 4 whiteboard markers', Price: 6.00, Stock: 80, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Correction Fluid', Description: 'Quick-dry correction fluid', Price: 1.50, Stock: 250, CategoryID: 1, ImageURL: 'ruta' }, // Stationery
        { Name: 'Graphing Calculator', Description: 'Advanced graphing calculator', Price: 100.00, Stock: 30, CategoryID: 6, ImageURL: 'ruta' }, // Calculators
        { Name: 'Scientific Calculator', Description: 'Standard scientific calculator', Price: 25.00, Stock: 60, CategoryID: 6, ImageURL: 'ruta' }, // Calculators
        { Name: 'Backpack', Description: 'Water-resistant student backpack', Price: 45.00, Stock: 40, CategoryID: 5, ImageURL: 'ruta' }, // Backpacks
        { Name: 'Laptop Sleeve', Description: '13-inch padded laptop sleeve', Price: 20.00, Stock: 100, CategoryID: 4, ImageURL: 'ruta' }, // Tech Accessories
        { Name: 'USB Flash Drive', Description: '64GB USB 3.0 flash drive', Price: 15.00, Stock: 150, CategoryID: 4, ImageURL: 'ruta' }, // Tech Accessories
        { Name: 'Headphones', Description: 'Over-ear noise-canceling headphones', Price: 80.00, Stock: 20, CategoryID: 4, ImageURL: 'ruta' }, // Tech Accessories
        { Name: 'Energy Drink', Description: '500ml energy drink', Price: 3.00, Stock: 250, CategoryID: 3, ImageURL: 'ruta' }, // Beverages
        { Name: 'Chocolate Bar', Description: 'Delicious chocolate bar', Price: 1.50, Stock: 500, CategoryID: 2, ImageURL: 'ruta' }, // Snacks
        { Name: 'Candy', Description: 'Mixed fruit candy pack', Price: 1.00, Stock: 400, CategoryID: 2, ImageURL: 'ruta' }, // Snacks
        { Name: 'Gum', Description: 'Mint-flavored chewing gum', Price: 0.80, Stock: 600, CategoryID: 2, ImageURL: 'ruta' }, // Snacks
        { Name: 'Chips', Description: 'Salted potato chips', Price: 2.00, Stock: 300, CategoryID: 2, ImageURL: 'ruta' }, // Snacks
        { Name: 'Cookies', Description: 'Pack of chocolate chip cookies', Price: 2.50, Stock: 200, CategoryID: 2, ImageURL: 'ruta' }, // Snacks
        { Name: 'Instant Noodles', Description: 'Cup of instant noodles', Price: 1.20, Stock: 350, CategoryID: 2, ImageURL: 'ruta' }, // Snacks
        { Name: 'Protein Bar', Description: 'High-protein snack bar', Price: 3.50, Stock: 100, CategoryID: 2, ImageURL: 'ruta' }, // Snacks
        { Name: 'Granola Bar', Description: 'Healthy granola bar', Price: 2.50, Stock: 150, CategoryID: 2, ImageURL: 'ruta' }, // Snacks
        { Name: 'Juice Box', Description: '250ml apple juice box', Price: 1.20, Stock: 400, CategoryID: 3, ImageURL: 'ruta' }, // Beverages
        { Name: 'Water Bottle', Description: '500ml bottled water', Price: 0.80, Stock: 500, CategoryID: 3, ImageURL: 'ruta' }, // Beverages
        { Name: 'Tea', Description: 'Lemon-flavored iced tea', Price: 1.50, Stock: 300, CategoryID: 3, ImageURL: 'ruta' }, // Beverages
      ]);

      await OrderStatus.bulkCreate([
        { Name: 'Pending' },
        { Name: 'Refunded' },
        { Name: 'Paid' },
        { Name: 'Failed' },
      ]);

      await PaymentMethods.bulkCreate([
        { Name: 'Credit Card' },
        { Name: 'Paypal' },
        { Name: 'Cash' },
        { Name: 'Bank Transfer' },
      ]);
  
      console.log('Seeding completed successfully');
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }
  
  module.exports = seedDatabase;