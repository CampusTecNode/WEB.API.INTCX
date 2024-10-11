const { Spaces } = require('../data/models');

// Obtener todos los espacios
const GetAll = async (req, res) => {
  try {
    const spaces = await Spaces.findAll({
      attributes: ['ID', 'Name', 'Description', 'Capacity', 'IsAvailable'],
      where: { DeletedAt: null },
    });
    
    if (!spaces.length) {
      return res.status(404).json({ message: 'No spaces found' });
    }

    return res.status(200).json(spaces);
  } catch (error) {
    console.error('Error fetching spaces:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener un espacio por ID
const GetByID = async (req, res) => {
  try {
    const { id } = req.params;
    const space = await Spaces.findByPk(id, {
      attributes: ['ID', 'Name', 'Description', 'Capacity', 'IsAvailable'],
      where: { DeletedAt: null },
    });

    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    return res.status(200).json(space);
  } catch (error) {
    console.error('Error fetching space:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Crear un nuevo espacio
const Create = async (req, res) => {
  try {
    const { Name, Description, Capacity, IsAvailable } = req.body;
    const newSpace = await Spaces.create({
      Name,
      Description,
      Capacity,
      IsAvailable,
    });

    return res.status(201).json(newSpace);
  } catch (error) {
    console.error('Error creating space:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Actualizar un espacio existente
const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Description, Capacity, IsAvailable } = req.body;

    const space = await Spaces.findByPk(id);

    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    space.Name = Name || space.Name;
    space.Description = Description || space.Description;
    space.Capacity = Capacity || space.Capacity;
    space.IsAvailable = IsAvailable !== undefined ? IsAvailable : space.IsAvailable;

    await space.save();

    return res.status(200).json(space);
  } catch (error) {
    console.error('Error updating space:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Borrado lógico de un espacio
const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const { deletedBy } = req.body;

    const space = await Spaces.findByPk(id);

    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    space.DeletedAt = new Date();
    space.DeletedBy = deletedBy || 'Unknown';
    await space.save();

    return res.status(200).json({ message: 'Space deleted (soft delete)' });
  } catch (error) {
    console.error('Error deleting space:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  GetAll,
  GetByID,
  Create,
  Update,
  Delete,
};
