module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define('Attachment', {
    file_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    updatedAt: false // deactivate updatedAt to not be used automatically (as AnyTasks does nothing with this info and will break the app as it does not exist in db)
  });

  Attachment.associate = (models) => {
    Attachment.belongsTo(models.Task, { foreignKey: 'taskId' });
  };

  return Attachment;
};
