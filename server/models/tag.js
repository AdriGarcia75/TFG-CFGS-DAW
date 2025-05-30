'use strict';

const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  Tag.associate = function (models) {
    Tag.belongsToMany(models.Task, {
      through: 'task_tags',
      foreignKey: 'tagId',
      otherKey: 'taskId',
    });
  };

  return Tag;
};
