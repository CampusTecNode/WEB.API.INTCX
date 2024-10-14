// src/data/seeder.js
const { Users, Roles, UserRoles, Products, Categories, OrderStatus, PaymentMethods, UserLikedProducts, ShoppingCart, CartDetails, Orders, OrderDetails, CartStatus, Spaces } = require('../../src/data/models/index');

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
          name: 'Admin',
          lastname: 'User',
          email: 'admin@example.com',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: '1234567890',
          phoneConfirmed: true,
          ImageURL: 'https://example.com/images/admin.jpg',
          CreatedBy: 'System',
        },
        {
          username: 'student', // 2
          name: 'Student',
          lastname: 'User',
          email: 'student@student.com',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: '0987654321',
          phoneConfirmed: false,
          ImageURL: 'https://example.com/images/student.jpg',
          CreatedBy: 'System',
        },
        {
          username: '1114102', // 3
          name: 'David',
          lastname: 'Solano',
          email: '1114102@est.intec.edu.do',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: '18492202181',
          phoneConfirmed: false,
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728877945/david_mhvlij.jpg',
          CreatedBy: 'System',
        },
        {
          username: '1114226', // 4
          name: 'Bill',
          lastname: 'Perez',
          email: '1114226@est.intec.edu.do',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: '18298905382',
          phoneConfirmed: false,
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728790632/ass_fnnttp.png',
          CreatedBy: 'System',
        },
        {
          username: 'cashier', // 5
          name: 'Cashier',
          lastname: 'User',
          email: 'cashier@inteconnect.com',
          password: '$2a$10$EjXJuDdXG9NHKMvlQAv8WeHTDlG9nOPJDLcXnroKpE/nINk2NifTa',
          emailConfirmed: true,
          phone: 'XXXXXXXXXX',
          phoneConfirmed: false,
          ImageURL: 'https://example.com/images/cashier.jpg',
          CreatedBy: 'System',
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
        { Name: 'Stationery', Description: 'Office and school supplies like notebooks, pens, and rulers', ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879223/descarga__50_-removebg-preview_yx6qyt.png' },
        { Name: 'Snacks', Description: 'Candy, chocolate, and other snacks', ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879219/descarga__52_-removebg-preview_1_afzawt.png' },
        { Name: 'Beverages', Description: 'Drinks like water, juice, and tea', ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879221/descarga__53_-removebg-preview_psrh4l.png' },
        { Name: 'Tech Accessories', Description: 'Laptop sleeves, USB drives, and other tech accessories', ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879218/descarga__54_-removebg-preview_fquabj.png' },
        { Name: 'Backpacks', Description: 'School and university backpacks', ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879216/backpacks-2048px-2x1-0006-removebg-preview_heiqao.png' },
        { Name: 'Calculators', Description: 'Graphing and scientific calculators', ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879214/best-calculators-removebg-preview_rqgimg.png' },
      ]);
    
      await Products.bulkCreate([
        {
          Name: 'Notebook',
          Description: '200-page notebook',
          Price: 5.00,
          Stock: 150,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728694805/notebook_cb2dkl.jpg',
          Color: 'Blue',
          Brand: 'PaperMate',
          Weight: 0.5, // Kg
          Size: 'A4',
          SKU: 'PM-NB-A4-200',
          ExpiryDate: null,
        },
        {
          Name: 'Mechanical Pencil',
          Description: '0.5mm mechanical pencil',
          Price: 2.50,
          Stock: 200,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728878516/234264-removebg-preview_1_pxb2jm.png',
          Color: 'Gray',
          Brand: 'Pentel',
          Weight: 0.02, // Kg
          Size: 'Standard',
          SKU: 'PN-MP-05',
          ExpiryDate: null,
        },
        {
          Name: 'Ballpoint Pen',
          Description: 'Blue ballpoint pen',
          Price: 1.00,
          Stock: 300,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728878592/descarga__29_-removebg-preview_dcvmef.png',
          Color: 'Blue',
          Brand: 'BIC',
          Weight: 0.01, // Kg
          Size: 'Standard',
          SKU: 'BIC-BP-BLUE',
          ExpiryDate: null,
        },
        {
          Name: 'Highlighter Set',
          Description: 'Pack of 4 neon highlighters',
          Price: 4.00,
          Stock: 120,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728878658/descarga__30_-removebg-preview_dy3vtu.png',
          Color: 'Multicolor',
          Brand: 'Sharpie',
          Weight: 0.05, // Kg
          Size: 'Standard',
          SKU: 'SH-HS-4PK',
          ExpiryDate: null,
        },
        {
          Name: 'Ruler',
          Description: '30 cm plastic ruler',
          Price: 0.80,
          Stock: 500,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728878691/descarga__31_-removebg-preview_klxgdh.png',
          Color: 'Clear',
          Brand: 'Staedtler',
          Weight: 0.05, // Kg
          Size: '30 cm',
          SKU: 'ST-RL-30CM',
          ExpiryDate: null,
        },
        {
          Name: 'Graphing Calculator',
          Description: 'Advanced graphing calculator',
          Price: 100.00,
          Stock: 30,
          CategoryID: 6, // Calculators
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728878728/descarga__32_-removebg-preview_rj7i3d.png',
          Color: 'Black',
          Brand: 'Texas Instruments',
          Weight: 0.4, // Kg
          Size: 'Standard',
          SKU: 'TI-GC-ADV',
          ExpiryDate: null,
        },
        {
          Name: 'Backpack',
          Description: 'Water-resistant student backpack',
          Price: 45.00,
          Stock: 40,
          CategoryID: 5, // Backpacks
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728878784/images__3_-removebg-preview_qtfynj.png',
          Color: 'Black',
          Brand: 'Nike',
          Weight: 0.6, // Kg
          Size: 'Standard',
          SKU: 'NK-BP-BLK',
          ExpiryDate: null,
        },
        {
          Name: 'Chocolate Bar',
          Description: 'Delicious chocolate bar',
          Price: 1.50,
          Stock: 500,
          CategoryID: 2, // Snacks
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728878848/istockphoto-121282958-612x612-removebg-preview_yig1s7.png',
          Color: 'Brown',
          Brand: 'Hershey’s',
          Weight: 0.1, // Kg
          Size: 'Standard',
          SKU: 'HSY-CB-STD',
          ExpiryDate: '2024-12-31',
        },
        {
          Name: 'Water Bottle',
          Description: '500ml bottled water',
          Price: 0.80,
          Stock: 500,
          CategoryID: 3, // Beverages
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728878919/61PvNa4VThL-removebg-preview_jxkefi.png',
          Color: 'Clear',
          Brand: 'Aquafina',
          Weight: 0.5, // Kg
          Size: '500ml',
          SKU: 'AQ-WB-500ML',
          ExpiryDate: '2025-06-30',
        },
        {
          Name: 'USB Flash Drive',
          Description: '64GB USB 3.0 flash drive',
          Price: 15.00,
          Stock: 150,
          CategoryID: 4, // Tech Accessories
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728878972/descarga__34_-removebg-preview_qrtny0.png',
          Color: 'Black',
          Brand: 'SanDisk',
          Weight: 0.01, // Kg
          Size: '64GB',
          SKU: 'SD-USB-64GB',
          ExpiryDate: null,
        },
        {
          Name: 'Instant Noodles',
          Description: 'Cup of instant noodles',
          Price: 1.20,
          Stock: 350,
          CategoryID: 2, // Snacks
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879011/descarga__35_-removebg-preview_hot5lp.png',
          Color: null, // No color applicable
          Brand: 'Nissin',
          Weight: 0.1, // Kg
          Size: 'Standard',
          SKU: 'NS-IN-STND',
          ExpiryDate: '2024-05-15',
        },
        {
          Name: 'Energy Drink',
          Description: '500ml energy drink',
          Price: 3.00,
          Stock: 250,
          CategoryID: 3, // Beverages
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879064/descarga__36_-removebg-preview_szemdn.png',
          Color: 'Red',
          Brand: 'Red Bull',
          Weight: 0.5, // Kg
          Size: '500ml',
          SKU: 'RB-ED-500ML',
          ExpiryDate: '2025-03-01',
        },
        {
          Name: 'Colored Pencils Set',
          Description: '24-pack of vibrant colored pencils',
          Price: 12.00,
          Stock: 100,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879266/descarga__37_-removebg-preview_xy8gzd.png',
          Color: 'Multicolor',
          Brand: 'Crayola',
          Weight: 0.3, // Kg
          Size: 'Standard',
          SKU: 'CY-CP-24',
          ExpiryDate: null,
        },
        {
          Name: 'Drawing Paper Pad',
          Description: '50-sheet 9x12 inch drawing pad',
          Price: 8.00,
          Stock: 80,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879263/PCAR53540B_PRNG_Drawing_Pad_9x12_36ct_Pa_08.22-removebg-preview_xapppe.png',
          Color: 'White',
          Brand: 'Canson',
          Weight: 0.4, // Kg
          Size: '9x12 inches',
          SKU: 'CN-DP-9X12',
          ExpiryDate: null,
        },
        {
          Name: 'Laptop Stand',
          Description: 'Adjustable aluminum laptop stand',
          Price: 25.00,
          Stock: 50,
          CategoryID: 4, // Tech Accessories
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879262/71cOnHXOg9L-removebg-preview_besp8f.png',
          Color: 'Silver',
          Brand: 'Rain Design',
          Weight: 1.0, // Kg
          Size: 'Adjustable',
          SKU: 'RD-LS-ADJ',
          ExpiryDate: null,
        },
        {
          Name: 'Wireless Mouse',
          Description: 'Ergonomic wireless mouse with 2.4GHz connectivity',
          Price: 18.00,
          Stock: 120,
          CategoryID: 4, // Tech Accessories
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879256/descarga__38_-removebg-preview_fmfgow.png',
          Color: 'Black',
          Brand: 'Logitech',
          Weight: 0.1, // Kg
          Size: 'Standard',
          SKU: 'LG-WM-BLK',
          ExpiryDate: null,
        },
        {
          Name: 'Laptop Backpack',
          Description: 'Durable and waterproof 15.6-inch laptop backpack',
          Price: 40.00,
          Stock: 70,
          CategoryID: 5, // Backpacks
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879254/descarga__39_-removebg-preview_spofla.png',
          Color: 'Gray',
          Brand: 'Samsonite',
          Weight: 0.8, // Kg
          Size: '15.6 inches',
          SKU: 'SM-BP-GRAY',
          ExpiryDate: null,
        },
        {
          Name: 'Graphite Pencils',
          Description: 'Set of 12 high-quality graphite pencils for sketching',
          Price: 6.00,
          Stock: 150,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879252/81y07cHdJlL-removebg-preview_czgtlz.png',
          Color: 'Black',
          Brand: 'Staedtler',
          Weight: 0.2, // Kg
          Size: 'Standard',
          SKU: 'ST-GP-12',
          ExpiryDate: null,
        },
        {
          Name: 'Wireless Earbuds',
          Description: 'Noise-cancelling wireless earbuds with charging case',
          Price: 50.00,
          Stock: 90,
          CategoryID: 4, // Tech Accessories
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879249/MY582-removebg-preview_zbzc6c.png',
          Color: 'White',
          Brand: 'Jabra',
          Weight: 0.05, // Kg
          Size: 'Compact',
          SKU: 'JB-WE-WHT',
          ExpiryDate: null,
        },
        {
          Name: 'Reusable Water Bottle',
          Description: '750ml stainless steel water bottle',
          Price: 15.00,
          Stock: 200,
          CategoryID: 3, // Beverages
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879246/descarga__40_-removebg-preview_alybow.png',
          Color: 'Blue',
          Brand: 'Hydro Flask',
          Weight: 0.75, // Kg
          Size: '750ml',
          SKU: 'HF-WB-750ML',
          ExpiryDate: null,
        },
        {
          Name: 'Protein Shake',
          Description: '500ml chocolate-flavored protein shake',
          Price: 5.00,
          Stock: 150,
          CategoryID: 3, // Beverages
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879244/descarga__41_-removebg-preview_zvrd8f.png',
          Color: 'Brown',
          Brand: 'Optimum Nutrition',
          Weight: 0.5, // Kg
          Size: '500ml',
          SKU: 'ON-PS-CHOC',
          ExpiryDate: '2024-09-30',
        },
        {
          Name: 'Portable Charger',
          Description: '10000mAh portable charger with dual USB ports',
          Price: 25.00,
          Stock: 100,
          CategoryID: 4, // Tech Accessories
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879241/51L3GFbMQHS._AC_SL1500_-removebg-preview_zctqvz.png',
          Color: 'Black',
          Brand: 'Anker',
          Weight: 0.3, // Kg
          Size: 'Compact',
          SKU: 'AK-PC-10K',
          ExpiryDate: null,
        },
        {
          Name: 'Smartwatch',
          Description: 'Fitness tracking smartwatch with heart rate monitor',
          Price: 120.00,
          Stock: 80,
          CategoryID: 4, // Tech Accessories
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879238/descarga__43_-removebg-preview_zhrfu5.png',
          Color: 'Black',
          Brand: 'Fitbit',
          Weight: 0.05, // Kg
          Size: 'Adjustable',
          SKU: 'FB-SW-HR',
          ExpiryDate: null,
        },
        {
          Name: 'Wireless Keyboard',
          Description: 'Bluetooth wireless keyboard with rechargeable battery',
          Price: 35.00,
          Stock: 100,
          CategoryID: 4, // Tech Accessories
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879237/s-l1200-removebg-preview_oxqddk.png',
          Color: 'White',
          Brand: 'Logitech',
          Weight: 0.4, // Kg
          Size: 'Compact',
          SKU: 'LG-WK-BT',
          ExpiryDate: null,
        },
        {
          Name: 'College Ruled Paper',
          Description: 'Pack of 500 sheets college ruled paper',
          Price: 10.00,
          Stock: 300,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879235/71H6Kqr900L._AC_UF1000_1000_QL80_-removebg-preview_iqev24.png',
          Color: 'White',
          Brand: 'Mead',
          Weight: 1.5, // Kg
          Size: '8.5x11 inches',
          SKU: 'MD-RP-500',
          ExpiryDate: null,
        },
        {
          Name: 'Laptop Cooling Pad',
          Description: 'Cooling pad for 15.6-inch laptops with dual fans',
          Price: 25.00,
          Stock: 60,
          CategoryID: 4, // Tech Accessories
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879233/81t9B5pBMBL-removebg-preview_vg9arh.png',
          Color: 'Black',
          Brand: 'Cooler Master',
          Weight: 0.8, // Kg
          Size: '15.6 inches',
          SKU: 'CM-LCP-156',
          ExpiryDate: null,
        },
        {
          Name: 'Gel Pens',
          Description: 'Pack of 12 assorted color gel pens',
          Price: 8.00,
          Stock: 200,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879231/images__4_-removebg-preview_klkuaz.png',
          Color: 'Assorted',
          Brand: 'Pilot',
          Weight: 0.2, // Kg
          Size: 'Standard',
          SKU: 'PL-GP-12',
          ExpiryDate: null,
        },
        {
          Name: 'Sticky Tabs',
          Description: 'Set of 10 sticky tab markers in bright colors',
          Price: 3.00,
          Stock: 250,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879229/descarga__45_-removebg-preview_qq7ayo.png',
          Color: 'Assorted',
          Brand: 'Post-it',
          Weight: 0.05, // Kg
          Size: 'Small',
          SKU: 'PI-ST-10',
          ExpiryDate: null,
        },
        {
          Name: 'Bluetooth Speaker',
          Description: 'Portable Bluetooth speaker with 360-degree sound',
          Price: 60.00,
          Stock: 90,
          CategoryID: 4, // Tech Accessories
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879226/descarga__46_-removebg-preview_grayz7.png',
          Color: 'Red',
          Brand: 'JBL',
          Weight: 0.7, // Kg
          Size: 'Medium',
          SKU: 'JBL-BS-RED',
          ExpiryDate: null,
        },
        {
          Name: 'Planner',
          Description: '2024 Weekly planner with hardcover and bookmarks',
          Price: 15.00,
          Stock: 180,
          CategoryID: 1, // Stationery
          ImageURL: 'https://res.cloudinary.com/dkq98o790/image/upload/v1728879225/16686_2-68821-removebg-preview_ja0q0d.png',
          Color: 'Navy Blue',
          Brand: 'Moleskine',
          Weight: 0.4, // Kg
          Size: 'A5',
          SKU: 'MS-WP-2024',
          ExpiryDate: null,
        },
        {
          Name: 'Reusable Coffee Cup',
          Description: '350ml reusable coffee cup with silicone lid',
          Price: 12.00,
          Stock: 150,
          CategoryID: 3, // Beverages
          ImageURL: 'ruta',
          Color: 'Green',
          Brand: 'KeepCup',
          Weight: 0.2, // Kg
          Size: '350ml',
          SKU: 'KC-RCC-350ML',
          ExpiryDate: null,
        },
        {
          Name: 'Desk Organizer',
          Description: 'Multi-compartment desk organizer for stationery',
          Price: 20.00,
          Stock: 100,
          CategoryID: 1, // Stationery
          ImageURL: 'ruta',
          Color: 'Black',
          Brand: 'Deflecto',
          Weight: 0.5, // Kg
          Size: 'Large',
          SKU: 'DF-DO-BLK',
          ExpiryDate: null,
        }
      ]);

      await UserLikedProducts.bulkCreate([
        { UserID: 2, ProductID: 1 },
        { UserID: 2, ProductID: 2 },
        { UserID: 2, ProductID: 3 },
        { UserID: 2, ProductID: 4 },
        { UserID: 2, ProductID: 5 },
        { UserID: 3, ProductID: 6 },
        { UserID: 3, ProductID: 7 },
        { UserID: 3, ProductID: 8 },
        { UserID: 3, ProductID: 9 },
        { UserID: 3, ProductID: 10 },
        { UserID: 4, ProductID: 11 },
        { UserID: 4, ProductID: 12 },
        { UserID: 4, ProductID: 13 },
        { UserID: 4, ProductID: 14 },
        { UserID: 4, ProductID: 15 },
        { UserID: 5, ProductID: 16 },
        { UserID: 5, ProductID: 17 },
        { UserID: 5, ProductID: 18 },
        { UserID: 5, ProductID: 19 },
        { UserID: 5, ProductID: 20 },
      ]);

      await PaymentMethods.bulkCreate([
        { Name: 'Credit Card' },
        { Name: 'Paypal' },
        { Name: 'Cash' },
        { Name: 'Bank Transfer' },
      ]);

      await CartStatus.bulkCreate([
        { Name: 'Activo' },
        { Name: 'Procesado' },
        { Name: 'Cancelado' },
      ]);

      await ShoppingCart.bulkCreate([
        { UserID: 1, CreationDate: new Date(), CartStatusID: 1 }, // Carrito activo del usuario 1
        { UserID: 2, CreationDate: new Date(), CartStatusID: 1 }, // Carrito activo del usuario 2
        { UserID: 3, CreationDate: new Date(), CartStatusID: 2 }, // Carrito procesado del usuario 3
        { UserID: 1, CreationDate: new Date(), CartStatusID: 2 }, // Carrito procesado del usuario 1
        { UserID: 4, CreationDate: new Date(), CartStatusID: 1 }, // Carrito activo del usuario 4
      ]);

      await CartDetails.bulkCreate([
        { CartID: 1, ProductID: 1, Quantity: 2, UnitPrice: 5.00 }, // Dos cuadernos en el carrito 1
        { CartID: 1, ProductID: 3, Quantity: 1, UnitPrice: 1.00 }, // Un bolígrafo en el carrito 1
        { CartID: 2, ProductID: 2, Quantity: 3, UnitPrice: 2.50 }, // Tres lápices en el carrito 2
        { CartID: 2, ProductID: 7, Quantity: 1, UnitPrice: 1.20 }, // Un sacapuntas en el carrito 2
        { CartID: 3, ProductID: 15, Quantity: 1, UnitPrice: 45.00 }, // Una mochila en el carrito 3 (procesado)
        { CartID: 4, ProductID: 8, Quantity: 4, UnitPrice: 6.00 }, // Cuatro marcadores en el carrito 4
      ]);

      await OrderStatus.bulkCreate([
        { Name: 'Pending' },
        { Name: 'Refunded' },
        { Name: 'Paid' },
        { Name: 'Failed' },
      ]);

      await Orders.bulkCreate([
        { UserID: 2, Date: new Date(), Total: 55.00,  StateID: 2, PaymentMethodID: 2, CartID: 2 }, // Orden del usuario 2, carrito 2
        { UserID: 1, Date: new Date(), Total: 100.00, StateID: 1, PaymentMethodID: 1, CartID: 1 }, // Orden del usuario 1, carrito 1
        { UserID: 3, Date: new Date(), Total: 45.00,  StateID: 3, PaymentMethodID: 3, CartID: 3 }, // Orden del usuario 3, carrito 3 (procesada)
        { UserID: 4, Date: new Date(), Total: 65.00,  StateID: 1, PaymentMethodID: 1, CartID: 4 }, // Orden del usuario 4, carrito 4
      ]);
      
      await OrderDetails.bulkCreate([
        { OrderID: 1, ProductID: 1, Count: 2, UnitPrice: 5.00 }, // Dos cuadernos en la orden 1
        { OrderID: 1, ProductID: 3, Count: 1, UnitPrice: 1.00 }, // Un bolígrafo en la orden 1
        { OrderID: 2, ProductID: 2, Count: 3, UnitPrice: 2.50 }, // Tres lápices en la orden 2
        { OrderID: 3, ProductID: 15, Count: 1, UnitPrice: 45.00 }, // Una mochila en la orden 3
        { OrderID: 4, ProductID: 8, Count: 4, UnitPrice: 6.00 }, // Cuatro marcadores en la orden 4
      ]);

      await Spaces.bulkCreate([
        {
            Name: 'Mesa de PingPong 1',
            Description: 'Mesa de ping pong cerca de la cafetería',
            Capacity: 2,
            Type: 'PingPong',
            Location: 'Edificio A, Planta Baja',
            Available: true,
            CreatedBy: 'System',
            UpdatedBy: 'System'
        },
        {
          Name: 'Mesa de PingPong 2',
          Description: 'Mesa de ping pong cerca de la cancha deportiva',
          Capacity: 2,
          Type: 'PingPong',
          Location: 'Edificio Deportivo',
          Available: true,
          CreatedBy: 'System',
          UpdatedBy: 'System'
        },
        {
          Name: 'Mesa de PingPong 3',
          Description: 'Mesa de ping pong cerca de la cancha deportiva',
          Capacity: 2,
          Type: 'PingPong',
          Location: 'Edificio Deportivo',
          Available: true,
          CreatedBy: 'System',
          UpdatedBy: 'System'
        },
        {
          Name: 'Mesa de PingPong 4',
          Description: 'Mesa de ping pong cerca de la cancha deportiva',
          Capacity: 2,
          Type: 'PingPong',
          Location: 'Edificio Deportivo',
          Available: true,
          CreatedBy: 'System',
          UpdatedBy: 'System'
        },
        {
            Name: 'Cubículo de Estudio 1',
            Description: 'Cubículo con capacidad para 4 personas, incluye proyector.',
            Capacity: 4,
            Type: 'Cubiculo',
            Location: 'Biblioteca, Piso 1',
            Available: true,
            CreatedBy: 'System',
            UpdatedBy: 'System'
        },
        {
          Name: 'Cubículo de Estudio 2',
          Description: 'Cubículo con capacidad para 6 personas.',
          Capacity: 6,
          Type: 'Cubiculo',
          Location: 'Biblioteca, Piso 1',
          Available: true,
          CreatedBy: 'System',
          UpdatedBy: 'System'
        },
        {
          Name: 'Cubículo de Estudio 3',
          Description: 'Cubículo con capacidad para 6 personas.',
          Capacity: 6,
          Type: 'Cubiculo',
          Location: 'Biblioteca, Piso 1',
          Available: true,
          CreatedBy: 'System',
          UpdatedBy: 'System'
        },
        {
          Name: 'Cubículo de Estudio 4',
          Description: 'Cubículo con capacidad para 6 personas.',
          Capacity: 6,
          Type: 'Cubiculo',
          Location: 'Biblioteca, Piso 2',
          Available: true,
          CreatedBy: 'System',
          UpdatedBy: 'System'
        },
        {
            Name: 'Parcela de Emprendimiento 1',
            Description: 'Espacio designado para mostrar y promocionar productos de emprendimiento estudiantil.',
            Capacity: 10,
            Type: 'Parcela',
            Location: 'Plaza Central',
            Available: true,
            CreatedBy: 'System',
            UpdatedBy: 'System'
        },
        {
            Name: 'Parcela de Emprendimiento 2',
            Description: 'Espacio en la entrada principal para emprendimientos estudiantiles',
            Capacity: 15,
            Type: 'Parcela',
            Location: 'Entrada Principal',
            Available: true,
            CreatedBy: 'System',
            UpdatedBy: 'System'
        },
       
       
    ]);

      console.log('Seeding completed successfully');
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }
  
  module.exports = seedDatabase;