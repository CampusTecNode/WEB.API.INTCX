const { ShoppingCart } = require('./shoppingCart');
const { Users, CartStatus, Products, CartDetails } = require('../data/models/index');

// Crear un carrito (si no existe) y agregar productos al carrito
const AddToCart = async (req, res) => {
  /*  
#swagger.tags = ['ShoppingCart']  
#swagger.description = 'Add a product to the user\'s active shopping cart, or create a new cart if none exists'  
*/

  try {
    const { UserID, ProductID, Quantity } = req.body;

    // Verificar si el usuario existe
    const user = await Users.findByPk(UserID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verificar si el producto existe
    const product = await Products.findByPk(ProductID);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Intentar encontrar un carrito activo del usuario
    let shoppingCart = await ShoppingCart.findOne({
      where: { UserID, CartStateID: 1 } // Estado activo
    });

    if (!shoppingCart) {
      // Si no existe un carrito activo, crear uno nuevo
      shoppingCart = await ShoppingCart.create({
        UserID,
        CartStateID: 1, // Estado activo
      });
    }

    // Intentar encontrar el detalle del carrito para el producto
    let cartDetail = await CartDetails.findOne({
      where: { CartID: shoppingCart.ID, ProductID, DeletedAt: null }
    });

    if (cartDetail) {
      // Si el detalle del carrito ya existe, actualizar la cantidad
      cartDetail.Quantity = Quantity;
      cartDetail.UpdatedAt = new Date();
      await cartDetail.save();
      return res.status(200).json({ message: 'Cart detail updated successfully', cartDetail });
    } else {
      // Si no existe, crear un nuevo detalle en el carrito
      const newCartDetail = await CartDetails.create({
        CartID: shoppingCart.ID,
        ProductID,
        Quantity,
        UnitPrice: product.Price,  // Precio del producto actual
      });
      return res.status(201).json({ message: 'Product added to cart successfully', newCartDetail });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const GetByUser = async (req, res) => {
  /*  
#swagger.tags = ['ShoppingCart']  
#swagger.description = 'Retrieve the active shopping cart for a specific user, including product details and cart status'  
*/

  try {
    const { userID } = req.params;

    // Buscar el carrito activo del usuario
    const cart = await ShoppingCart.findOne({
      where: { UserID: userID, CartStateID: 1, DeletedAt: null },  // 1 = Estado activo
      include: [
        {
          model: CartDetails,
          attributes: ['ID', 'Quantity', 'UnitPrice'],
          include: [
            {
              model: Products,
              attributes: [
                'ID', 'SKU', 'Name', 'Description', 'Price', 'Stock', 'CategoryID', 'ImageURL', 
                'Color', 'Brand', 'Weight', 'Size', 'ExpirityDate', 'CreatedAt', 
                'CreatedBy', 'UpdatedAt', 'UpdatedBy'
              ],
            },
          ],
        },
        {
          model: CartStatus,
          attributes: ['ID', 'Name'],  // Incluir el estado del carrito
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({ message: 'No active cart found for this user' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching active shopping cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const DeleteCartItem = async (req, res) => {
  /*  
#swagger.tags = ['ShoppingCart']  
#swagger.description = 'Remove a product from the shopping cart, and mark the cart as inactive if it becomes empty'  
*/

  try {
    const { CartID, ProductID } = req.body;

    // Verificar si el carrito existe y está activo
    const cart = await ShoppingCart.findOne({
      where: { ID: CartID, CartStateID: 1 } // Estado activo
    });

    if (!cart) {
      return res.status(404).json({ message: 'Shopping cart not found or is not active' });
    }

    // Verificar si el producto existe en el carrito
    const cartDetail = await CartDetails.findOne({
      where: { CartID: cart.ID, ProductID, DeletedAt: null }
    });

    if (!cartDetail) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    // Borrado lógico del producto
    cartDetail.DeletedAt = new Date();
    await cartDetail.save();

    // Verificar si es el último producto en el carrito
    const remainingCartDetails = await CartDetails.findAll({
      where: { CartID: cart.ID, DeletedAt: null }
    });

    if (remainingCartDetails.length === 0) {
      // Si no quedan más productos, marcamos el carrito como inactivo
      cart.CartStateID = 2;  // 2 = Estado inactivo
      await cart.save();
      return res.status(200).json({ message: 'Product removed and cart marked as inactive', cart });
    }

    return res.status(200).json({ message: 'Product removed from cart', cartDetail });
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  AddToCart,
  GetByUser,
  DeleteCartItem,
};
