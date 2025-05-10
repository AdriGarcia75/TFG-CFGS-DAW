'use strict';

module.exports = (sequelize, DataTypes) => {
  const Column = sequelize.define('Column', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  Column.associate = function (models) {
    Column.belongsTo(models.Board, {
      foreignKey: 'boardId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Column;
};
