'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('activities', [{
        userid: 1,
        username: "User1",
        title: "Batman",
        note: "great movie",
        rating: 5
      },
      {
        userid: 1,
        username: "User1",
        title: "Toy Story",
        note: "ok movie",
        rating: 3
      },
      {
        userid: 1,
        username: "User1",
        title: "Apollo 13",
        note: "sucked",
        rating: 1
      },
      {
        userid: 3,
        username: "333333",
        title: "The Godfather",
        note: "excellent movie",
        rating: 5
      },
      {
        userid: 4,
        username: "UserTheFourth",
        title: "Superman",
        note: "dumb",
        rating: 2
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('activities', null, {});
  }
};
