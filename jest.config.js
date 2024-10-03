module.exports = {
    testEnvironment: 'node',
    verbose: true,
    
    // Agrega los reporteros aquí
    reporters: [
      'default',
      ['jest-junit', {
        outputDirectory: './test-reports',  // Directorio donde se guardarán los reportes
        outputName: 'junit.xml',            // Nombre del archivo de reporte
      }]
    ]
  };
  