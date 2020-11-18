import { Model, DataTypes, Sequelize } from 'sequelize';
import { database } from "../database";

export class Provider extends Model {
    public id!: number;
    public slName!: string;
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
  
  //User.belongsTo(Company, {as: 'companies', foreignKey: 'CompanyId'});
