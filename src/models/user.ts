import { Model, DataTypes, Sequelize } from 'sequelize';
import database from "../database";
import { Sales } from './sales';
import { Product } from './product';

export class User extends Model {
    public id!: number;
    public name!: string;
    public familyName!: string;
    public Sales!: Sales[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export interface UserInterface {
    id: Number
    name: String
    familyName: String
    createdAt: Date
    updatedAt: Date
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      familyName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
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
      tableName: "users",
      sequelize: database, // this bit is important
    }
  );
