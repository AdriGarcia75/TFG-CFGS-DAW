'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Boards', 'description');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Boards', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  }
};
