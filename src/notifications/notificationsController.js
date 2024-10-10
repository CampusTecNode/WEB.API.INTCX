const { Notifications } = require('../data/models/index');

// Obtener notificaciones por userID
const GetByUser = async (req, res) => {
    /*  
    #swagger.tags = ['Notifications']  
    #swagger.description = 'Retrieve all specific user notifications'  
    */
  try {
    const { userID } = req.params;

    const notifications = await Notifications.findAll({
      where: { UserID: userID, DeletedAt: null },
      attributes: ['ID', 'Title', 'Message', 'Type', 'IsRead', 'CreatedAt'],
      order: [['CreatedAt', 'DESC']]  // Ordenar de la más reciente a la más antigua
    });

    if (!notifications.length) {
      return res.status(404).json({ message: 'No notifications found for this user' });
    }

    return res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Crear una nueva notificación
const Create = async (req, res) => {
    /*  
    #swagger.tags = ['Notifications']  
    #swagger.description = 'Create notification'  
    */
  try {
    const { UserID, Title, Message, Type } = req.body;

    const newNotification = await Notifications.create({
      UserID,
      Title,
      Message,
      Type,
      IsRead: false, // Por defecto, la notificación es nueva y no ha sido leída
      CreatedBy: 'System',  // Esto puede variar según el sistema o el usuario que la crea
    });

    return res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  GetByUser,
  Create,
};
