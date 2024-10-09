const { UserLikedProducts, Products, Users } = require('../data/models/index');

const likeProduct = async (req, res) => {
    /*  
#swagger.tags = ['UserLikedProducts']  
#swagger.description = 'Mark a product as liked by the user'  
*/
    try {
        const { UserID, ProductID } = req.body;

        const existingLike = await UserLikedProducts.findOne({
            where: {
                UserID,
                ProductID,
                DeletedAt: null,
            },
        });

        if (existingLike) {
            return res.status(400).json({ message: 'Product already liked' });
        }

        const newLike = await UserLikedProducts.create({
            UserID,
            ProductID,
            CreateBy: 'System',
        });
    
        return res.status(201).json(newLike);
    } catch (error) {
        console.error('Error liking product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const unlikeProduct = async (req, res) => {
    /*  
#swagger.tags = ['UserLikedProducts']  
#swagger.description = 'Remove the like from a product for the user (soft delete)'  
*/
    try {
        const { UserID, ProductID } = req.body;

        const existingLike = await UserLikedProducts.findOne({
            where: {
                UserID,
                ProductID,
            },
        });

        if (!existingLike) {
            return res.status(404).json({ message: 'Like not found' });
        }

        await existingLike.destroy();

        return res.status(204).json();
    } catch (error) {
        console.error('Error unliking product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getLikedProducts = async (req, res) => {
    /*  
#swagger.tags = ['UserLikedProducts']  
#swagger.description = 'Retrieve all products liked by a specific user'  
*/
    try {
      const { userID } = req.params;
  
      const user = await Users.findByPk(userID, {
        include: [{
          model: Products,
          through: {
            model: UserLikedProducts,
            where: { DeletedAt: null },  // Solo obtener los que no han sido eliminados lógicamente
          },
          attributes: [
            'ID', 'SKU', 'Name', 'Description', 'Price', 'Stock', 'CategoryID', 'ImageURL', 
            'Color', 'Brand', 'Weight', 'Size', 'ExpiryDate', 'CreatedAt', 
            'CreatedBy', 'UpdatedAt', 'UpdatedBy'
          ],
        }],
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json(user.Products);
    } catch (error) {
      console.error('Error fetching liked products:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


module.exports = {
    likeProduct,
    unlikeProduct,
    getLikedProducts,
};