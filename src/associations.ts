import { User } from './models/user';
import { Product } from './models/product';
import { Sales } from './models/sales';

export const UserAssociation = User.belongsToMany(Product, { through: Sales, foreignKey: 'userId'});
export const ProductAssociation = Product.belongsToMany(User, { through: Sales, foreignKey: 'productId'});
