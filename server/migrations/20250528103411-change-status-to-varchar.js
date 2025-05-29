'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'status_temp', {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: 'pending',
    });

    await queryInterface.sequelize.query(`
      UPDATE Tasks SET status_temp = status;
    `);

    await queryInterface.removeColumn('Tasks', 'status');

    await queryInterface.renameColumn('Tasks', 'status_temp', 'status');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'status_temp', {
      type: Sequelize.ENUM('pending', 'in_progress', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    });

    await queryInterface.sequelize.query(`
      UPDATE Tasks SET status_temp = status;
    `);

    await queryInterface.removeColumn('Tasks', 'status');

    await queryInterface.renameColumn('Tasks', 'status_temp', 'status');
  }
};
