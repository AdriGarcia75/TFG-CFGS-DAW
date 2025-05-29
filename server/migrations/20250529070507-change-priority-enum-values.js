'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Tasks', 'priority', {
      type: Sequelize.ENUM('baja', 'media', 'alta'),
      allowNull: false,
      defaultValue: 'media',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Tasks', 'priority', {
      type: Sequelize.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium',
    });
  }
};
