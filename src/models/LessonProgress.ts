import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class LessonProgress extends Model {}

LessonProgress.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },
  { sequelize, tableName: 'lesson_progress', modelName: 'LessonProgress', indexes: [{ unique: true, fields: ['userId', 'lessonId'] }] }
);
