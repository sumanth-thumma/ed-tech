import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Section extends Model {}

Section.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  },
  { sequelize, tableName: 'sections', modelName: 'Section' }
);
