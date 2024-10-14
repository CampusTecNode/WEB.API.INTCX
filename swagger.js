const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'INTEConnect API',
    description: 'Documentación automática de la API de INTEConnect',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Categories', 
      description: 'Endpoints related to categories',
    },
    {
      name: 'Products', 
      description: 'Endpoints related to products',
    },
    {
      name: 'Auth',
      description: 'Authentication and Authorization endpoints',
    },
    {
      name: 'PaymentMethods',
      description: 'Endpoints related to payment methods',
    },
    {
      name: 'CartStatus',
      description: 'Endpoints related to cart statuses',
    },
    {
      name: 'UserLikedProducts',
      description: 'Endpoints related to managing products liked by users',
    },
    {
      name: 'Orders',
      description: 'Endpoints related to order management',
    },
    {
      name: 'OrderStatus',
      description: 'Endpoints related to order statuses',
    },
    {
      name: 'ShoppingCart',
      description: 'Endpoints related to shopping cart management',
    },
    {
      name: 'Notifications',
      description: 'Endpoints related to notifications managment',
    },
    {
      name: 'Spaces',
      description: 'Endpoints related to spaces management',
    },
    {
      name: 'Reservations',
      description: 'Endpoints related to reservations management',
    }
],
  securityDefinitions: {
    apiKeyAuth:{
        type: "apiKey",
        in: "header",       // can be "header", "query" or "cookie"
        name: "X-API-KEY",  // name of the header, query parameter or cookie
        description: "any description..."
    }
},
};

const outputFile = './swagger-output.json'; // Archivo donde se generará la documentación
const endpointsFiles = ['./app.js']; // Archivo donde se encuentran las rutas

// Generar la documentación automática
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app')           // Your project's root file
})
