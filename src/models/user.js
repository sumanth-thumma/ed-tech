const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  async isValidPassword (password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('student', 'instructor', 'admin'),
        allowNull: false,
        defaultValue: 'student'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        async beforeCreate (user) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  );

  return User;
};
