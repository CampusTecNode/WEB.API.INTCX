const { OrderDetails } = require('../data/models/index');

// Obtener todos los OrderDetailss
const Get = async (req, res) => {
  try {
    const orderDetails = await OrderDetails.findAll({
      attributes: ['ID', 'OrderID', 'ProductID', 'Count', 'UnitPrice', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
      where: { DeletedAt: null },
    });
    return res.json(orderDetails);
  } catch (error) {
    console.error('Error fetching order details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener un OrderDetails por ID
const GetByID = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetail = await OrderDetails.findByPk(id, {
      attributes: ['ID', 'OrderID', 'ProductID', 'Count', 'UnitPrice', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
      where: { DeletedAt: null },
    });

    if (!orderDetail) {
      return res.status(404).json({ message: 'OrderDetails not found' });
    }

    return res.json(orderDetail);
  } catch (error) {
    console.error('Error fetching order detail by ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Crear un nuevo OrderDetails
const Create = async (req, res) => {
  try {
    const { OrderID, ProductID, Count, UnitPrice } = req.body;
    const newOrderDetails = await OrderDetails.create({
      OrderID,
      ProductID,
      Count,
      UnitPrice,
      CreatedBy: 'System',  // Por ahora será 'System', se cambiará a usuario del token más tarde
    });
    return res.status(201).json(newOrderDetails);
  } catch (error) {
    console.error('Error creating order detail:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Actualizar un OrderDetails
const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const { OrderID, ProductID, Count, UnitPrice } = req.body;

    const orderDetail = await OrderDetails.findByPk(id);
    if (!orderDetail) {
      return res.status(404).json({ message: 'OrderDetails not found' });
    }

    orderDetail.OrderID = OrderID || orderDetail.OrderID;
    orderDetail.ProductID = ProductID || orderDetail.ProductID;
    orderDetail.Count = Count || orderDetail.Count;
    orderDetail.UnitPrice = UnitPrice || orderDetail.UnitPrice;
    orderDetail.UpdatedAt = new Date();
    orderDetail.UpdatedBy = 'System';  // Por ahora será 'System'

    await orderDetail.save();

    return res.json(orderDetail);
  } catch (error) {
    console.error('Error updating order detail:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Borrado lógico de un OrderDetails
const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const { deletedBy } = req.body;

    const orderDetail = await OrderDetails.findByPk(id);
    if (!orderDetail) {
      return res.status(404).json({ message: 'OrderDetails not found' });
    }

    orderDetail.DeletedAt = new Date();
    orderDetail.DeletedBy = deletedBy || 'Unknown';

    await orderDetail.save();

    return res.json({ message: 'OrderDetails deleted (soft delete)' });
  } catch (error) {
    console.error('Error deleting order detail:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  Get,
  GetByID,
  Create,
  Update,
  Delete,
};
