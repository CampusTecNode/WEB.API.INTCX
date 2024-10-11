const { CartStatus } = require('../data/models/index');

const Get = async (req, res) => {
    /*  
#swagger.tags = ['CartStatus']  
#swagger.description = 'Retrieve all cart statuses that are currently active (not deleted)'  
*/
    try {
        const cartStatus = await CartStatus.findAll({
            attibutes: ['ID', 'Name', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
            where: { DeletedAt: null },
        });
        return res.status(200).json(cartStatus);
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
};

const GetByID = async (req, res) => {
    /*  
#swagger.tags = ['CartStatus']  
#swagger.description = 'Retrieve a specific cart status by its ID'  
*/
    try {
        const { id } = req.params;

        const cartStatus = await CartStatus.findByPk(id, {
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
    /*  
#swagger.tags = ['CartStatus']  
#swagger.description = 'Create a new cart status'  
*/
    try {
        const { Name } = req.body;
        const newCartStatus = await CartStatus.create({Name});
        return res.status(201).json(newCartStatus);
    } catch (error){
        console.error('Error creating new CartStatus:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const Update = async (req, res) => {
    /*  
#swagger.tags = ['CartStatus']  
#swagger.description = 'Update an existing cart status by its ID'  
*/
    try {
        const { id } = req.params;
        const { Name } = req.body;

        const cartStatus = await CartStatus.findByPk(id);

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
    /*  
#swagger.tags = ['CartStatus']  
#swagger.description = 'Soft delete a cart status by marking it as deleted but keeping it in the database'  
*/
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