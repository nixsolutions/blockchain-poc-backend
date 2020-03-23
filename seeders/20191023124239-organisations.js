'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Organisations', [
      {
      name: 'parents',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        name: 'hospital',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'kindergarten',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Organisations', null, {});
  }
};
