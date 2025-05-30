'use strict';

const { Sequelize } = require('sequelize');

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
    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.ENUM('baja', 'media', 'alta'),
      defaultValue: 'media',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    columnId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Task.associate = function (models) {
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

    Task.hasMany(models.Attachment, { foreignKey: 'taskId', as: 'attachments' });
  };

  return Task;
};