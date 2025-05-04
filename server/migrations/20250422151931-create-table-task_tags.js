'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Task_Tags', {
			taskId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Tasks',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			tagId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Tags',
					key: 'id',
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
		});

		await queryInterface.addConstraint('Task_Tags', {
			fields: ['taskId', 'tagId'],
			type: 'primary key',
			name: 'task_tag_primary_key',
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Task_Tags');
	},
};
