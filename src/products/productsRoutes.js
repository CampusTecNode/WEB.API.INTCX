// src/routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('./productsController');


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints for managing products
 */


/**
* @swagger
* /products:
*   get:
*     summary: Retorna una lista de productos
*      tags: [Products] 
*     responses:
*       200:
*         description: Una lista de productos
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Product'
*/

router.get('/', productsController.Get);

router.get('/:id', productsController.GetByID);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: Product created
 */

router.post('/', productsController.Create);

router.put('/:id', productsController.Update);

router.delete('/:id', productsController.Delete);

module.exports = router;
