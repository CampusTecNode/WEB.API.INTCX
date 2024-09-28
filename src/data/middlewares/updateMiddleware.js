module.exports = (sequelize) => {
    sequelize.addHook('beforeUpdate', (instance, options) => {
      instance.UpdatedAt = new Date();
      instance.UpdatedBy = 'System'; //TODO: Change this to the actual user
    });
  };
  