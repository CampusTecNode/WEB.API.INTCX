const { Categories } = require('../data/models/index');


const Get = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      attributes: ['ID', 'Name', 'Description', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
      where: { DeletedAt: null },
    });
    return res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const GetByID = async (req, res) => {
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
