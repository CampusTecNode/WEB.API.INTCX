const { Products, UserLikedProducts } = require('../data/models/index');

  const Get = async (req, res) => {
    /* 	#swagger.tags = ['Products']
        #swagger.description = 'Get Products' */
    try {

      const { userID } = req.query;

      const products = await Products.findAll({
      attributes: [
        'ID', 'SKU', 'Name', 'Description', 'Price', 'Stock', 'CategoryID', 'ImageURL', 
        'Color', 'Brand', 'Weight', 'Size', 'ExpirityDate', 'CreatedAt', 
        'CreatedBy', 'UpdatedAt', 'UpdatedBy'
      ],
      where: { DeletedAt: null },
      });

      if (!products.length) {
        return res.status(404).json({ message: 'No products found' });
      }

      const likedProducts = await UserLikedProducts.findAll({
        where: { UserID: userID },
        attributes: ['ProductID'],
      });
  
      const likedProductsIDs = likedProducts.map(product => product.ProductID);
      
      const productsWithLikes = products.map(product => ({
          ...product.toJSON(),
          IsLiked: likedProductsIDs.includes(product.ID),
        }));

      return res.status(200).json(productsWithLikes);
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const GetByID = async (req, res) => {
    /* 	#swagger.tags = ['Products']
        #swagger.description = 'Get Products by id' */
    try {
      const { id } = req.params;
      const { userID } = req.body;
      const product = await Products.findByPk(id, {
        attributes: [
          'ID', 'SKU', 'Name', 'Description', 'Price', 'Stock', 'CategoryID', 'ImageURL', 
          'Color', 'Brand', 'Weight', 'Size', 'ExpirityDate', 'CreatedAt', 
          'CreatedBy', 'UpdatedAt', 'UpdatedBy'
        ],
        where: { DeletedAt: null },
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const likedProducts = await UserLikedProducts.findAll({
        where: { UserID: userID },
        attributes: ['ProductID'],
      });
  
      const likedProductsIDs = likedProducts.map(product => product.ProductID);
      
      const productWithLikes = {
          ...product.toJSON(),
          IsLiked: likedProductsIDs.includes(product.ID),
        };

      return res.status(200).json(productWithLikes);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const Create = async (req, res) => {
    /* 	#swagger.tags = ['Products']
        #swagger.description = 'Create Product' */
    try {
      const { Name, Description, Price, Stock, CategoryID, ImageURL, Color, Brand, Weight, Size, SKU, ExpiryDate } = req.body;
      const newProduct = await Products.create({ 
        SKU, Name, Description, Price, Stock, CategoryID, ImageURL, 
        Color, Brand, Weight, Size, ExpiryDate 
      });
      return res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const Update = async (req, res) => {
    /* 	#swagger.tags = ['Products']
        #swagger.description = 'Update Products' */
    try {
      const { id } = req.params;
      const { Name, Description, Price, Stock, CategoryID, ImageURL, Color, Brand, Weight, Size, SKU, ExpiryDate } = req.body;

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
      product.Color = Color || product.Color;
      product.Brand = Brand || product.Brand;
      product.Weight = Weight || product.Weight;
      product.Size = Size || product.Size;
      product.SKU = SKU || product.SKU;
      product.ExpiryDate = ExpiryDate || product.ExpiryDate;
      await product.save();

      return res.json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const Delete = async (req, res) => {
    /* 	#swagger.tags = ['Products']
        #swagger.description = 'Delete Product' */
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
