'use strict';
module.exports = (sequelize, DataTypes) => {
  var SuratJalan = sequelize.define('SuratJalan', {
    task: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    VehicleId: DataTypes.INTEGER,
    CostumerId: DataTypes.INTEGER
  });
  
  // Class Method
  SuratJalan.associate = function (models) {
    // ...associate the models
    SuratJalan.belongsTo(models.User)
    SuratJalan.belongsTo(models.Vehicle)
  };
  
  return SuratJalan;
};