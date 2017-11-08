'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    status: DataTypes.STRING
  });
  
  // Class Method
  User.associate = function (models) {
    // ...associate the models
    User.belongsToMany(models.Vehicle, {through: 'SuratJalan'})
  };
  
  
  //bcrypt
  User.beforeCreate((user, options) => {
    const saltRounds = 10;
    const myPlaintextPassword = user.password;
    return  bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
      user.password = hash
    });
  });
  
  User.beforeBulkUpdate((user, options) => {
    const saltRounds = 10;
    const myPlaintextPassword = user.attributes.password;
    return  bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
      user.attributes.password = hash
    });
  });
  
  return User;
};