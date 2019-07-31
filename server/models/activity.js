'use strict';
module.exports = (sequelize, DataTypes) => {
  const activity = sequelize.define('activity', {
    userid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    note: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  activity.associate = function(models) {
    // associations can be defined here
  };
  return activity;
};