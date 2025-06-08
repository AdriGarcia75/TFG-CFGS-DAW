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
    color: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: '#000000',
      // add a validate norm to validate if the value to be entered is a correct hexadecimal value
      validate: {
        is: /^#([0-9A-Fa-f]{6})$/,
      },
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
      as: 'Tasks',
      timestamps: false,
    });
  };

  return Tag;
};
