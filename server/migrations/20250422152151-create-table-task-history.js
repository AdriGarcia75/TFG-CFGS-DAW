'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Task_History', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            taskId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Tasks',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            change_type: {
                type: Sequelize.ENUM('created', 'updated', 'deleted', 'status_changed', 'priority_changed'),
                allowNull: false,
            },
            change_description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            changedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Task_History');
    },
};
