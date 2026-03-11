import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database';

export class User extends Model {
  declare id: string;
  declare fullName: string;
  declare email: string;
  declare password: string;
  declare bio: string | null;
  declare avatar: string | null;
  declare role: 'student' | 'instructor' | 'admin';

  async isValidPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.TEXT, allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.ENUM('student', 'instructor', 'admin'), allowNull: false, defaultValue: 'student' }
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    hooks: {
      async beforeCreate(user: User) {
        user.password = await bcrypt.hash(user.password, 10);
      },
      async beforeUpdate(user: User) {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  }
);
