'use strict';
module.exports = (sequelize, DataTypes) => {
  const friends = sequelize.define('friends', {
    userid: DataTypes.INTEGER,
    friend: DataTypes.STRING,
    friendid: DataTypes.INTEGER
  }, {});
  friends.associate = function(models) {
    // associations can be defined here
  };
  return friends;
};