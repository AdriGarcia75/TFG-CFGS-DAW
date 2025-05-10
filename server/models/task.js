'use strict';

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      defaultValue: 'pending',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
    },
    recurrence: {
      type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'none'),
      defaultValue: 'none',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    },
  });

  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    Task.belongsTo(models.Board, {
      foreignKey: 'boardId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Task.belongsTo(models.Column, {
      foreignKey: 'columnId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Task;
};
