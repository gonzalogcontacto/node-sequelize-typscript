import { Model, DataTypes, Sequelize, HasManyGetAssociationsMixin, Association } from 'sequelize';
import database from "../database";
import { Product } from './product';

export class Provider extends Model {
    public id!: number;
    public slName!: string;
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly Products?: Product[];
}

export interface ProviderInterface {
    id: Number
    name: String
    createdAt: Date
    updatedAt: Date
}

Provider.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      slName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
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
      tableName: "providers",
      sequelize: database, // this bit is important
    }
  );
