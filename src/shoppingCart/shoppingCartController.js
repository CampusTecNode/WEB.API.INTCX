const { ShoppingCart } = require('./shoppingCart');
const { Users, CartStatus } = require('../data/models');

// Crear un nuevo carrito de compras
const Create = async (req, res) => {
  try {
    const { UserID, CartStateID } = req.body;

    // Verificar si el usuario existe
    const user = await Users.findByPk(UserID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Crear el carrito
    const newCart = await ShoppingCart.create({
      UserID,
      CartStateID,
    });

    return res.status(201).json(newCart);
  } catch (error) {
    console.error('Error creating shopping cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener todos los carritos de un usuario
const GetByUser = async (req, res) => {
  try {
    const { userID } = req.params;

    // Buscar los carritos del usuario
    const carts = await ShoppingCart.findAll({
      where: { UserID: userID },
      include: [
        { model: CartStatus, attributes: ['ID', 'Name'] },  // Incluir el estado del carrito
      ],
    });

    if (!carts.length) {
      return res.status(404).json({ message: 'No carts found for this user' });
    }

    return res.status(200).json(carts);
  } catch (error) {
    console.error('Error fetching shopping carts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Actualizar el estado de un carrito
const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const { CartStateID } = req.body;

    // Buscar el carrito
    const cart = await ShoppingCart.findByPk(id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Actualizar el estado del carrito
    cart.CartStateID = CartStateID;
    await cart.save();

    return res.json({ message: 'Cart status updated successfully', cart });
  } catch (error) {
    console.error('Error updating cart status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Borrado lógico del carrito
const Delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el carrito
    const cart = await ShoppingCart.findByPk(id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Borrado lógico (marcarlo como eliminado)
    cart.DeletedAt = new Date();
    await cart.save();

    return res.json({ message: 'Cart deleted successfully (soft delete)' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  Create,
  GetByUser,
  Update,
  Delete,
};
