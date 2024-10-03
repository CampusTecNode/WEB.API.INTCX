const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'INTEConnect API',
    description: 'Documentación automática de la API de INTEConnect',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json'; // Archivo donde se generará la documentación
const endpointsFiles = ['./app.js']; // Archivo donde se encuentran las rutas

// Generar la documentación automática
swaggerAutogen(outputFile, endpointsFiles);
