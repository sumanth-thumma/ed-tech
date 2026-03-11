const { DataTypes, Model } = require('sequelize');

class Enrollment extends Model {}

module.exports = (sequelize) => {
  Enrollment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      status: {
        type: DataTypes.ENUM('active', 'completed', 'cancelled'),
        defaultValue: 'active',
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Enrollment',
      tableName: 'enrollments'
    }
  );

  return Enrollment;
};
