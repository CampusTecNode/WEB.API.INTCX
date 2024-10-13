const cron = require('node-cron'); 
const { Spaces, Reservations } = require('../data/models');
const { Op } = require('sequelize');

cron.schedule('*/2 * * * *', async () => { // Se ejecuta cada 5 minutos
  const now = new Date();

  // Buscar las reservas que hayan terminado pero que no se hayan marcado como canceladas
  const finishedReservations = await Reservations.findAll({
    where: {
      EndTime: { [Op.lt]: now },
      DeletedAt: null,
    },
  });

  for (const reservation of finishedReservations) {
    // Cambiar el estado del espacio a disponible
    const space = await Spaces.findByPk(reservation.SpaceID);
    space.Available = true;
    await space.save();
  }

  console.log('Checked reservations and updated space availability.');
});
