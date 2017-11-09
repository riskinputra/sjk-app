'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    map: DataTypes.TEXT
  });

  // Class Method
  Customer.associate = function (models) {
    // ...associate the models
    // Customer.belongsTo(models.SuratJalan)
  };

  return Customer;
};
