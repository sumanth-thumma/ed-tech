import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Enrollment extends Model {}

Enrollment.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }
  },
  { sequelize, tableName: 'enrollments', modelName: 'Enrollment', indexes: [{ unique: true, fields: ['userId', 'courseId'] }] }
);
