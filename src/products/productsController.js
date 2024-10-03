  const swagger = require('../../swagger');
const { Products } = require('../data/models/index');
/**
* @swagger
* /products:
*   get:
*     summary: Retorna una lista de productos
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

  const Get = async (req, res) => {
    try {
      const products = await Products.findAll({
      attributes: ['ID', 'Name', 'Description', 'Price', 'Stock', 'CategoryID', 'ImageURL', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
      where: { DeletedAt: null },
      });
      return res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const GetByID = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id, {
        attributes: ['ID', 'Name', 'Description', 'Price', 'Stock', 'CategoryID', 'ImageURL', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
        where: { DeletedAt: null },
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const Create = async (req, res) => {
    try {
      const { Name, Description, Price, Stock, CategoryID, ImageURL } = req.body;
      const newProduct = await Products.create({ Name, Description, Price, Stock, CategoryID, ImageURL });
      return res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const Update = async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, Description, Price, Stock, CategoryID, ImageURL } = req.body;

      const product = await Products.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      product.Name = Name || product.Name;
      product.Description = Description || product.Description;
      product.Price = Price || product.Price;
      product.Stock = Stock || product.Stock;
      product.CategoryID = CategoryID || product.CategoryID;
      product.ImageURL = ImageURL || product.ImageURL;
      await product.save();

      return res.json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const Delete = async (req, res) => {
    try {
      const { id } = req.params;
      const { deletedBy } = req.body;

      const product = await Products.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      product.DeletedAt = new Date();
      product.DeletedBy = deletedBy || 'Unknown';
      await product.save();

      return res.json({ message: 'Product deleted (soft delete)' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {
      Get,
      GetByID,
      Create,
      Update,
      Delete
  };
