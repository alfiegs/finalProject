'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('users', [{
        email: 'User1',
        password: "xxx",
        bio: "test"
      },
      {
        email: 'Two',
        password: "xxx",
        bio: "the second user"
      },
      {
        email: '333333',
        password: "xxx",
        bio: "the third user"
      },
      {
        email: 'UserTheFourth',
        password: "xxx",
        bio: "the fourth user"
      },
      {
        email: 'Cinco',
        password: "xxx",
        bio: "the fifth user"
      },
      {
        email: 'SixyBoy',
        password: "xxx",
        bio: "the sixth user"
      }], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('users', null, {});
  }
};
