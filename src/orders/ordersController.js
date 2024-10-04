const { Orders } = require('../data/models/index');

const Get = async (req, res) => {
  try {
    const orders = await Orders.findAll({
        attributes: ['ID', 'UserID', 'Date', 'Name', 'Total', 'StateID', 'PaymentMethodID', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
        where: { DeletedAt: null },
    });
    return res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const GetByID = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findByPk(id, {
        attributes: ['ID', 'UserID', 'Date', 'Total', 'StateID', 'PaymentMethodID', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
        where: { DeletedAt: null },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const Create = async (req, res) => {
  try {
    const { UserID, Date, Total, StateID, PaymentMethodID } = req.body;
    const newOrder = await Orders.create({ UserID, Date, Name, Total, StateID, PaymentMethodID });
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const { UserID, Date, Name, Total, StateID, PaymentMethodID } = req.body;

    const order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.UserID = UserID || order.UserID;
    order.Date = Description || order.Description;
    order.Price = Price || order.Price;
    order.Stock = Stock || order.Stock;
    order.CategoryID = CategoryID || order.CategoryID;
    order.ImageURL = ImageURL || order.ImageURL;
    await order.save();

    return res.json(order);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const { deletedBy } = req.body;

    const order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Product not found' });
    }

    order.DeletedAt = new Date();
    order.DeletedBy = deletedBy || 'Unknown';
    await order.save();

    return res.json({ message: 'Order deleted (soft delete)' });
  } catch (error) {
    console.error('Error deleting order:', error);
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
