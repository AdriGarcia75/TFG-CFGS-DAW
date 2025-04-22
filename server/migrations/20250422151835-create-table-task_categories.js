'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Task_Categories', {
            taskId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Tasks',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            categoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Categories',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        });

        await queryInterface.addConstraint('Task_Categories', {
            fields: ['taskId', 'categoryId'],
            type: 'primary key',
            name: 'task_category_primary_key',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Task_Categories');
    },
};
