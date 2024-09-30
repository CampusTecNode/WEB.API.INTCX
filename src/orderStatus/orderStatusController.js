const { OrderStatus } = require('../data/models/index');

const Get = async (req, res) => {
    try {
        const orderStatus = await OrderStatus.findAll({
            attibutes: ['ID', 'Name', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
            where: { DeletedAt: null },
        });
        return res.json(orderStatus);
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
};

const GetByID = async (req, res) => {
    try {
        const orderStatus = await OrderStatus.findByPK(id, {
            attibutes: ['ID', 'Name', 'CreatedAt', 'reatedBy', 'UpdatedAt', 'UpdatedBy'],
            where: { DeletedAt: null },
        });

        if (!orderStatus) {
            return res.status(404).json({ message: 'OrderStatus Not Found' });
        }
    
        return res.json(orderStatus);
    } catch (error) {
        console.error(`error fetching the OrderStatus number: ${req.param.ID}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const Create = async (req, res) => {
    try {
        const { Name } = req.body;
        const newOrderStatus = OrderStatus.Create({Name});
        return res.status(201).json(newOrderStatus);
    } catch (error){
        console.error('Error creating new OrderStatus:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const Update = async (req, res) => {
    try {
        const { id } = req.param;
        const { Name } = req.body;

        const orderStatus = OrderStatus.findByPk(id);
        if (!orderStatus) {
            return res.status(400).json({ message: 'Order Status not found' });
        }

        orderStatus.Name = Name || orderStatus.Name;
        await orderStatus.save();
    
        return res.json(orderStatus);
    } catch (error) {
        console.error('Error updating orderStatus:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const Delete = async (req, res) => {
    try {
      const { id } = req.params;
      const { deletedBy } = req.body; // El usuario que realiza el borrado
  
      const orderStatus = await OrderStatus.findByPk(id);
      if (!orderStatus) {
        return res.status(404).json({ message: 'orderStatus not found' });
      }
  
      // Marcar la categoría como eliminada
      orderStatus.DeletedAt = new Date();
      orderStatus.DeletedBy = deletedBy || 'Unknown'; // Puedes manejar la obtención del usuario de otra manera
      await orderStatus.save();
  
      return res.json({ message: 'Order Status deleted (soft delete)' });
    } catch (error) {
      console.error('Error deleting orderStatus:', error);
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