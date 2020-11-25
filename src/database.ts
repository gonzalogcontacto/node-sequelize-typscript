import * as Sequelize from 'sequelize'
import data from './config/config.json';
import { Product } from './models/product';
import { User } from './models/user';
import { Sales } from './models/sales';

const db = data.development.database
const username = data.development.username
const password = data.development.password

const database = new Sequelize.Sequelize(db, username, password, {
  dialect: "mysql",
  port: 3306,
  define: {
    timestamps: false
  }
});

database.authenticate().then(() => {
  async() => {
    console.log("database connected")
    try {
        await database.sync({force: true})

    } catch (error) {
        console.log(error.message)
    }

}}).catch( (e: any) => {
  console.log(e.message)
})

export default database;