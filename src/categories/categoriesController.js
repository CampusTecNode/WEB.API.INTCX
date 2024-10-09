const { Categories, Products, UserLikedProducts } = require('../data/models/index');

const Get = async (req, res) => {
  /* 	#swagger.tags = ['Categories']
        #swagger.description = 'Get All Categories' */
  try {
    // id del usuario para devolver los likes
    const { userID } = req.query;

    const categories = await Categories.findAll({
      attributes: ['ID', 'Name', 'Description', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
      include: [
        {
          model: Products,
          as: 'Products',
          attributes: ['ID', 'Name', 'Description', 'Price', 'Stock', 'CategoryID', 'ImageURL', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
        }
      ],
      where: { DeletedAt: null },
    });

    if (!categories.length) {
      return res.status(404).json({ message: 'No categories found' });
    }

    const likedProducts = await UserLikedProducts.findAll({
      where: { UserID: userID },
      attributes: ['ProductID'],
    });

    const likedProductsIDs = likedProducts.map(product => product.ProductID);
    
    const categoriesWithLikes = categories.map(category => {
      const modifiedProducts = category.Products.map(product => ({
        ...product.toJSON(),
        IsLiked: likedProductsIDs.includes(product.ID),
      }));
      return {
        ...category.toJSON(),
        Products: modifiedProducts,
      };
    });


    return res.status(200).json(categoriesWithLikes);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const GetByID = async (req, res) => {
  /* 	#swagger.tags = ['Categories']
        #swagger.description = 'Get All Categories by id' */
    try {
      const { id } = req.params;
      const category = await Categories.findByPk(id, {
        attributes: ['ID', 'Name', 'Description', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
        where: { DeletedAt: null },
      });
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      return res.json(category);
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

const Create = async (req, res) => {
  /* 	#swagger.tags = ['Categories']
        #swagger.description = 'Create one new Category' */
  try {
    const { Name, Description } = req.body;
    const newCategory = await Categories.create({ Name, Description });
    return res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const Update = async (req, res) => {
  /* 	#swagger.tags = ['Categories']
        #swagger.description = 'Update one Category' */
    try {
      const { id } = req.params;
      const { Name, Description } = req.body;
  
      const category = await Categories.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      category.Name = Name || category.Name;
      category.Description = Description || category.Description;
      await category.save();
  
      return res.json(category);
    } catch (error) {
      console.error('Error updating category:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  const Delete = async (req, res) => {
    /* 	#swagger.tags = ['Categories']
        #swagger.description = 'Delete Category' */
    try {
      const { id } = req.params;
      const { deletedBy } = req.body; // El usuario que realiza el borrado
  
      const category = await Categories.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Marcar la categoría como eliminada
      category.DeletedAt = new Date();
      category.DeletedBy = deletedBy || 'Unknown'; // Puedes manejar la obtención del usuario de otra manera
      await category.save();
  
      return res.json({ message: 'Category deleted (soft delete)' });
    } catch (error) {
      console.error('Error deleting category:', error);
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
