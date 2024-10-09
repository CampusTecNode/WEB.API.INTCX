const { Orders, ShoppingCart, CartDetails, OrderDetails, Products, PaymentMethods  } = require('../data/models/index');


const CreateOrderFromCart = async (req, res) => {
  /*  
#swagger.tags = ['Orders']  
#swagger.description = 'Create an order from an existing shopping cart, moving cart details to order details and marking the cart as processed'  
*/
  const { cartID, userID } = req.body;

  try {
    // Obtener carrito y sus detalles
    const cart = await ShoppingCart.findByPk(cartID, {
      include: [{ model: CartDetails }],
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Crear la orden
    const newOrder = await Orders.create({
      UserID: userID,
      Total: cart.Total,
      Date: new Date(),
      StateID: 1, // Estado inicial de la orden
      PaymentMethodID: cart.PaymentMethodID,
      CartID: cartID,
    });

    // Copiar los detalles del carrito a la tabla OrderDetails
    const orderDetails = cart.CartDetails.map(detail => ({
      OrderID: newOrder.ID,
      ProductID: detail.ProductID,
      Count: detail.Count,
      UnitPrice: detail.UnitPrice,
    }));

    await OrderDetails.bulkCreate(orderDetails);

    // Cambiar el estado del carrito a "Procesado"
    const processedState = await CartStates.findOne({ where: { Name: 'Procesado' } });
    cart.CartStateID = processedState.ID;
    await cart.save();

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const Get = async (req, res) => {
  /*  
#swagger.tags = ['Orders']  
#swagger.description = 'Retrieve a list of all orders with their details, including products, order state, and payment method'  
*/
  try {
    const orders = await Orders.findAll({
        attributes: ['ID', 'UserID', 'Date', 'Name', 'Total', 'StateID', 'PaymentMethodID', 'CreatedAt', 'CreatedBy', 'UpdatedAt', 'UpdatedBy'],
        where: { DeletedAt: null },
        include: [
          { 
            model: OrderDetails, 
            include: [{ model: Products, attributes: ['SKU','Name', 'Description', 'Price', 'ImageURL'] }] 
          },
          { model: OrderStates, attributes: ['ID', 'Name'] },  // Incluir el estado de la orden
          { model: PaymentMethods, attributes: ['ID', 'Name'] }  // Incluir el método de pago
        ],
    });
    return res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const GetOrdersByUser = async (req, res) => {
  /*  
#swagger.tags = ['Orders']  
#swagger.description = 'Retrieve all orders made by a specific user, including product details, order state, and payment method'  
*/
  const { userID } = req.params;  // El userID se pasará como parámetro

  try {
    // Buscar todas las órdenes del usuario
    const orders = await Orders.findAll({
      where: { UserID: userID },
      include: [
        { 
          model: OrderDetails, 
          include: [{ model: Products, attributes: ['SKU', 'Name', 'Description', 'Price', 'ImageURL'] }] 
        },
        { model: OrderStates, attributes: ['ID', 'Name'] },  // Incluir el estado de la orden
        { model: PaymentMethods, attributes: ['ID', 'Name'] }  // Incluir el método de pago
      ],
      attributes: ['ID', 'Date', 'Total', 'CreatedAt', 'UpdatedAt']
    });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const Delete = async (req, res) => {
  /*  
#swagger.tags = ['Orders']  
#swagger.description = 'Soft delete an order by marking it as deleted without removing it from the database'  
*/
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
    return res.status(500).json({ message: 'Internal server errr' });
  }
};

module.exports = {
    CreateOrderFromCart,
    GetOrdersByUser,
    Get,
    Delete
};
