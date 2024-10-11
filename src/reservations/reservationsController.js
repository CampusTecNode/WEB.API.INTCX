const { Reservations, Spaces, Users } = require('../data/models/index');
const { Op } = require('sequelize');

// Crear una nueva reservación
const CreateReservation = async (req, res) => {
  /*  
    #swagger.tags = ['Reservations']  
    #swagger.description = 'Create a new reservation for a user if the space is not already reserved and the user does not already have a reservation of the same type'  
  */
  try {
    const { UserID, SpaceID, StartTime, EndTime } = req.body;

    // Verificar si el espacio existe
    const space = await Spaces.findByPk(SpaceID);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    // Verificar si el usuario ya tiene una reserva en el mismo espacio y tipo
    const existingReservation = await Reservations.findOne({
      where: {
        UserID,
        SpaceID,
        EndTime: { [Op.gt]: new Date() },  // Verificar que no haya una reserva activa
        DeletedAt: null,
      },
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'User already has an active reservation for this space' });
    }

    // Verificar si el espacio está reservado en el rango de tiempo
    const overlappingReservation = await Reservations.findOne({
      where: {
        SpaceID,
        [Op.or]: [
          { StartTime: { [Op.between]: [StartTime, EndTime] } },
          { EndTime: { [Op.between]: [StartTime, EndTime] } },
        ],
        DeletedAt: null,
      },
    });

    if (overlappingReservation) {
      return res.status(400).json({ message: 'Space is already reserved during this time' });
    }

    // Crear la nueva reserva
    const newReservation = await Reservations.create({
      UserID,
      SpaceID,
      StartTime,
      EndTime,
      CreatedBy: 'System',
    });

    return res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Cancelar las reservas activas de un usuario
const CancelReservationByUser = async (req, res) => {
  /*  
    #swagger.tags = ['Reservations']  
    #swagger.description = 'Cancel all active reservations made by the user'  
  */
  try {
    const { UserID } = req.params;

    // Obtener todas las reservas activas del usuario
    const activeReservations = await Reservations.findAll({
      where: {
        UserID,
        EndTime: { [Op.gt]: new Date() },  // Solo reservas activas
        DeletedAt: null,
      },
    });

    if (!activeReservations.length) {
      return res.status(404).json({ message: 'No active reservations found for this user' });
    }

    // Marcar todas las reservas como eliminadas (borrado lógico)
    await Promise.all(activeReservations.map(async (reservation) => {
      reservation.DeletedAt = new Date();
      reservation.DeletedBy = 'System';
      await reservation.save();
    }));

    return res.status(200).json({ message: 'All active reservations have been cancelled' });
  } catch (error) {
    console.error('Error cancelling reservations:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener todas las reservaciones de un usuario
const GetReservationsByUser = async (req, res) => {
  /*  
    #swagger.tags = ['Reservations']  
    #swagger.description = 'Retrieve all reservations made by a user'  
  */
  try {
    const { UserID } = req.params;

    const reservations = await Reservations.findAll({
      where: {
        UserID,
        DeletedAt: null,  // Solo reservas no eliminadas
      },
      include: [
        {
          model: Spaces,
          attributes: ['Name', 'Description', 'Location', 'Capacity'],
        },
      ],
      order: [['StartTime', 'DESC']],
    });

    if (!reservations.length) {
      return res.status(404).json({ message: 'No reservations found for this user' });
    }

    return res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations by user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  CreateReservation,
  CancelReservationByUser,
  GetReservationsByUser,
};
