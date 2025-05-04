'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Task_Projects', {
			taskId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Tasks',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			projectId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Projects',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
		});

		await queryInterface.addConstraint('Task_Projects', {
			fields: ['taskId', 'projectId'],
			type: 'primary key',
			name: 'task_project_primary_key',
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Task_Projects');
	},
};
