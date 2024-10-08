const { CartDetails, ShoppingCart, Products } = require('../data/models');

// Upsert (Crear o actualizar un detalle de carrito)
const upsertCartDetails = async (req, res) => {
  try {
    const { CartID, ProductID, Quantity, UnitPrice } = req.body;

    // Verificar si el carrito existe
    const cart = await ShoppingCart.findByPk(CartID);
    if (!cart) {
      return res.status(404).json({ message: 'Shopping cart not found' });
    }

    // Verificar si el producto existe
    const product = await Products.findByPk(ProductID);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Intentar encontrar el detalle del carrito
    let cartDetail = await CartDetails.findOne({
      where: { CartID, ProductID }
    });

    if (cartDetail) {
      // Si el detalle ya existe, actualizar la cantidad y precio unitario
      cartDetail.Quantity = Quantity;
      cartDetail.UnitPrice = UnitPrice || cartDetail.UnitPrice; // Si no se pasa UnitPrice, mantenemos el existente
      await cartDetail.save();
      return res.status(200).json({ message: 'Cart detail updated successfully', cartDetail });
    } else {
      // Si no existe el detalle, crearlo
      const newCartDetail = await CartDetails.create({
        CartID,
        ProductID,
        Quantity,
        UnitPrice,
      });
      return res.status(201).json({ message: 'Cart detail created successfully', newCartDetail });
    }
  } catch (error) {
    console.error('Error upserting cart detail:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener detalles del carrito por CartID
const getCartDetails = async (req, res) => {
  try {
    const { cartID } = req.params;

    const cartDetails = await CartDetails.findAll({
      where: { CartID: cartID },
      include: [
        { model: Products, attributes: ['ID', 'Name', 'Description', 'Price', 'ImageURL'] },
      ],
    });

    if (!cartDetails.length) {
      return res.status(404).json({ message: 'No cart details found for this cart' });
    }

    return res.status(200).json(cartDetails);
  } catch (error) {
    console.error('Error fetching cart details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  upsertCartDetails,
  getCartDetails,
};
