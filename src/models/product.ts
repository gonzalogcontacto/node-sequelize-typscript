import { Model, DataTypes, Sequelize, DecimalDataType } from 'sequelize';
import { database } from "../database";
import { Company } from '../models/company';
import { Provider } from './provider';

export class Product extends Model {
    public id!: number;
    public title!: string;
    public price!: DecimalDataType;
    public providerId!: Provider;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export interface ProductInterface {
    id: Number
    title: String
    price: DecimalDataType
    providerId: Provider
    createdAt: Date
    updatedAt: Date
}

Product.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      price: {
        type: new DataTypes.DECIMAL,
        allowNull: false,
      },
      providerId: {
        type: new DataTypes.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: new DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: new DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    },
    {
      tableName: "products",
      sequelize: database, // this bit is important
    }
  );
  
