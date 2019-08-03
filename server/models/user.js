'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
        models.user.hasMany(models.activity, {foreignKey: 'id'})
  };
  return user;
};