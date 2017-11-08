'use strict';
module.exports = (sequelize, DataTypes) => {
  var SuratJalan = sequelize.define('SuratJalan', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    task: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    VehicleId: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER
  });
  
  // Class Method
  SuratJalan.associate = function (models) {
    // ...associate the models
    SuratJalan.belongsTo(models.User)
    SuratJalan.belongsTo(models.Vehicle)
    SuratJalan.belongsTo(models.Customer)
  };
  
  return SuratJalan;
};