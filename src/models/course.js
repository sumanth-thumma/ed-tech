const { DataTypes, Model } = require('sequelize');

class Course extends Model {}

module.exports = (sequelize) => {
  Course.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Course',
      tableName: 'courses'
    }
  );

  return Course;
};
