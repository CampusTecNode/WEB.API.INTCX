const { Reservations, Spaces } = require('../data/models/index');
const { Op } = require('sequelize');

class ReservationService {

    #spaceTypeMinimunDurationTime = {
        PingPong: 30,
        Cubiculo: 60,
        Parcela: 1440, // 24 hours
    };

    #spaceTypeMaxDurationTime = {
        PingPong: 120, // 2 hours
        Cubiculo: 180, //3 hours
        Parcela: 20160, // 2 weeks
    };

    async createReservation(UserID, SpaceID, StartDate, EndDate) {

      const space = await Spaces.findByPk(SpaceID);
      
      if (!space) {
        return { StatusCode: 404, Result: 'Space not found' };
      }
  
      if (!space.Available) {
        return { StatusCode: 400, Result: 'Space not available' };
      }
  
      const existingReservation = await Reservations.findOne({
        include: [{ model: Spaces, where: { Type: space.Type } }],
        where: {
          UserID,
          SpaceID,
          EndDate: { [Op.gt]: new Date() },
          DeletedAt: null,
        },
      });
  
      if (existingReservation) {
        return { StatusCode: 400, Result: 'User already has an active reservation for this space' };
      }
  
      const isReservationDateAndTimeValid = await this.validateReservationDateAndTime(StartDate, EndDate, space.Type);

      if  (isReservationDateAndTimeValid.valid) {
        const overlappingReservation = await Reservations.findOne({
            where: {
              SpaceID,
              [Op.or]: [
                { StartDate: { [Op.between]: [StartDate, EndDate] } },
                { EndDate: { [Op.between]: [StartDate, EndDate] } },
              ],
              DeletedAt: null,
            },
          });
      
          if (overlappingReservation) {
            return { StatusCode: 400, Result: 'Space is already reserved during this time' };
          }
      
          const newReservation = await Reservations.create({
            UserID,
            SpaceID,
            StartDate,
            EndDate,
            CreatedBy: 'System',
          });    

          space.Available = false;
          space.save();

          await space.update(spaceUpdated);   

          return {StatusCode: 201, Result: newReservation};
      }
      else {
        return { StatusCode: isReservationDateAndTimeValid.StatusCode, Result: isReservationDateAndTimeValid.Result };
      }
    }

    async validateReservationDateAndTime(StartDate, EndDate, spaceType) {

        const now = new Date();
        const minDuration = this.#spaceTypeMinimunDurationTime[spaceType];
        const maxDuration = this.#spaceTypeMaxDurationTime[spaceType];
        const start = new Date(StartDate);
        const end = new Date(EndDate);
        const durationTime = (end - start) / 60000; // Convert to minutes

        const advanceTime = (start - now) / (1000 * 60 * 60);
  
        if (advanceTime < 1 ) {
            return { StatusCode: 400, Result: 'The reservation has to be maded with 24 advance hour', valid: false };
        }

        if (start < now) {
            return { StatusCode: 400, Result: 'Start time must be in the future', valid: false };
        }

        if (durationTime < minDuration) {
            return { StatusCode: 400, Result: `Reservation duration has to be between ${minDuration} and ${maxDuration}`, valid: false };
        }

        if (durationTime > maxDuration) {
            return { StatusCode: 400, Result: `Reservation duration has to be between ${minDuration} and ${maxDuration}`, valid: false };
        }
  
        if (durationTime % minDuration !== 0) {
          return { StatusCode: 400, Result: 'Reservation duration is not valid', valid: false };
        }
  
        if (start.getHours() < 8 || end.getHours() > 20) {
          return { StatusCode: 400, Result: 'Reservation must be between 8:00 and 20:00', valid: false };
        }
  
        return { StatusCode: 200, valid: true };
    }
  }
  
  module.exports = new ReservationService();