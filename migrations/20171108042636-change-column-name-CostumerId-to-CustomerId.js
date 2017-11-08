'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('SuratJalans', 'CostumerId', 'CustomerId')
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
