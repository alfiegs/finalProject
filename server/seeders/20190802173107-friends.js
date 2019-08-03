'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('friends', [{
        userid: 1,
        friend: "Two",
        friendid: 2
      },
      {
        userid: 1,
        friend: "333333",
        friendid: 3
      },
      {
        userid: 1,
        friend: "Cinco",
        friendid: 5
      },
      {
        userid: 2,
        friend: "User1",
        friendid: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('friends', null, {});
  }
};
