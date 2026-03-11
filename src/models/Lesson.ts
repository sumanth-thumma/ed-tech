import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Lesson extends Model {}

Lesson.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    videoUrl: { type: DataTypes.STRING, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: true },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    isPreview: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  },
  { sequelize, tableName: 'lessons', modelName: 'Lesson' }
);
