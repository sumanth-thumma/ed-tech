import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Course extends Model {}

Course.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false, defaultValue: 'general' },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    thumbnail: { type: DataTypes.STRING, allowNull: true },
    published: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  },
  { sequelize, tableName: 'courses', modelName: 'Course' }
);
