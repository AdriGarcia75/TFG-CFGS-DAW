'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tags', 'color', {
      type: Sequelize.STRING(7),
      allowNull: false,
      defaultValue: '#000000',
      comment: 'Hexadecimal color code',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tags', 'color');
  }
};
