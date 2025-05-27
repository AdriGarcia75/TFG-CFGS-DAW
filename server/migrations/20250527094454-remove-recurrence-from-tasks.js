'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('tasks', 'recurrence');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'recurrence', {
      type: Sequelize.ENUM('daily', 'weekly', 'monthly', 'none'),
      allowNull: false,
      defaultValue: 'none',
    });
  }
};
