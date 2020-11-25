import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import database from "../database";
import { User } from './user';
import { Product } from './product';

export class Sales extends Model {
    public id!: number;
    public userId!: number;
    public productId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public Product!: Product;
    public User!: User;
}

Sales.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
      },
      productId: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Product,
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL',
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
      tableName: "sales",
      sequelize: database, // this bit is important
    }
  );

  
  
  

  Sales.belongsTo(User);
  Sales.belongsTo(Product);

