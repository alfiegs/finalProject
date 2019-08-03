'use strict';
module.exports = (sequelize, DataTypes) => {
  const activity = sequelize.define('activity', {
    userid: DataTypes.INTEGER,
    username: DataTypes.STRING,
    title: DataTypes.STRING,
    note: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  activity.associate = function(models) {
    // associations can be defined here
    models.activity.belongsTo(models.user, {foreignKey: 'userid'})
  };
  return activity;
};