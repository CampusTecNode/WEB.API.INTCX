const { CartStatus } = require('./cartStatus');

const Get = async (req, res) => {
    try {
        const cartStatus = await CartStatus.findAll({
            attibutes: ['ID', 'Name', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
            where: { DeletedAt: null },
        });
        return res.json(cartStatus);
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
};

const GetByID = async (req, res) => {
    try {
        const { id } = req.params;

        const cartStatus = await CartStatus.findByPK(id, {
            attibutes: ['ID', 'Name', 'CreatedAt', 'reatedBy', 'UpdatedAt', 'UpdatedBy'],
            where: { DeletedAt: null },
        });

        if (!cartStatus) {
            return res.status(404).json({ message: 'CartStatus Not Found' });
        }
    
        return res.json(cartStatus);
    } catch (error) {
        console.error(`error fetching the CartStatus number: ${req.param.ID}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const Create = async (req, res) => {
    try {
        const { Name } = req.body;
        const newCartStatus = CartStatus.Create({Name});
        return res.status(201).json(newCartStatus);
    } catch (error){
        console.error('Error creating new CartStatus:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const Update = async (req, res) => {
    try {
        const { id } = req.param;
        const { Name } = req.body;

        const cartStatus = CartStatus.findByPk(id);

        if (!cartStatus) {
            return res.status(400).json({ message: 'Cart Status not found' });
        }

        cartStatus.Name = Name || cartStatus.Name;
        await cartStatus.save();
    
        return res.json(cartStatus);
    } catch (error) {
        console.error('Error updating cartStatus:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const Delete = async (req, res) => {
    try {
      const { id } = req.params;
      const { deletedBy } = req.body; // El usuario que realiza el borrado
  
      const cartStatus = await CartStatus.findByPk(id);
      if (!cartStatus) {
        return res.status(404).json({ message: 'cartStatus not found' });
      }
  
      // Marcar la categoría como eliminada
      cartStatus.DeletedAt = new Date();
      cartStatus.DeletedBy = deletedBy || 'Unknown'; // Puedes manejar la obtención del usuario de otra manera
      await cartStatus.save();
  
      return res.json({ message: 'Cart Status deleted (soft delete)' });
    } catch (error) {
      console.error('Error deleting cartStatus:', error);
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