import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Review extends Model {}

Review.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT, allowNull: true }
  },
  { sequelize, tableName: 'reviews', modelName: 'Review', indexes: [{ unique: true, fields: ['userId', 'courseId'] }] }
);
