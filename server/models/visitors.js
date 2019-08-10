'use strict';
module.exports = (sequelize, DataTypes) => {
  const visitors = sequelize.define('visitors', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    comments: DataTypes.STRING
  }, {});
  visitors.associate = function(models) {
    // associations can be defined here
  };
  return visitors;
};