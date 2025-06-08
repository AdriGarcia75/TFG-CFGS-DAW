module.exports = (sequelize, DataTypes) => {
  const TaskTags = sequelize.define('task_tags', {
    taskId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Tasks',
        key: 'id',
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Tags',
        key: 'id',
      },
    },
  }, {
    timestamps: false,
  });

  return TaskTags;
};
