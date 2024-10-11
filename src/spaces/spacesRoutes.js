const express = require('express');
const router = express.Router();
const spacesController = require('./spacesController');

// Rutas para espacios

// Obtener todos los espacios
router.get('/', spacesController.GetAll);

// Obtener un espacio por ID
router.get('/:id', spacesController.GetByID);

// Crear un nuevo espacio
router.post('/', spacesController.Create);

// Actualizar un espacio existente
router.put('/:id', spacesController.Update);

// Eliminar (borrado lógico) un espacio
router.delete('/:id', spacesController.Delete);

module.exports = router;
