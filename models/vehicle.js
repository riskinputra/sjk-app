'use strict';
module.exports = (sequelize, DataTypes) => {
  var Vehicle = sequelize.define('Vehicle', {
    plat_no: DataTypes.STRING,
    km: DataTypes.INTEGER,
    type: DataTypes.STRING
  });
  
  // Class Method
  Vehicle.associate = function (models) {
    // ...associate the models
    Vehicle.belongsToMany(models.User, {through: 'SuratJalan'})
  };
  
  return Vehicle;
};