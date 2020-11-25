import { Request, Response } from 'express';

import { Op, Model } from 'sequelize';
import { Sales } from '../models/sales';
import { User, UserInterface } from '../models/user';
import { Product } from '../models/product';
import { Provider } from '../models/provider';
import { ProductAssociation } from '../associations';
import { UserAssociation } from '../associations';

class UsersController {

    public async index(req: Request, res: Response) {

        try{
            const user: Array<User> | null = await User.findAll();

            if(user) {
                res.json(user);
            }else{
                res.sendStatus(404);
            }

        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }

    public async show(req: Request, res: Response){
    /*
        User.findByPk(req.params.id, { raw: true })
        .then((user) => (user) ? res.send(user): console.log(0))
        .catch((err: Error) => res.json(err));
    */
        try{
            
        
            const product = await Product.findAll({
                include: [
                    {
                        model: Provider
                    }
                ]
            });

            const productss = await Provider.findAll({
                include: [
                    {
                        model: Product
                    }
                ],
                raw: true,
                nest: true
            });
        
            const providers: Provider[] | null =  await Provider.findAll( 
                {
                    where:{
                        id: 1
                    },
                    include: [
                        { model: Product }
                    ],
                    raw:true,
                    nest:true
                }
            );

            const other = productss[0].getDataValue;
            const json = productss;
            console.log(providers);
        
            res.json(
                {
                    product: product, 
                    providers: providers[0]
                }
            );

        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }

    }

    public async sales(req: Request, res: Response){


        try{
            const result = await Sales.findAll({
                include: [
                    
                    {model: User},
                    {model: Product}
                ],
                nest: true
            });
            
            res.json(result);

        } catch (error){
            console.log(error);
            res.send(error);
        }
            
    }

    public async salesOfUser(req: Request, res: Response){

        try{
            
            // ¡¡¡ FUNCIONA PARA INCLUDE N:M!!!!
            /*
                User.hasMany(Sales, {foreignKey: 'userId', as :'sales'});
                Product.belongsToMany(User, {through: Sales, foreignKey: 'productId'});
                User.belongsToMany(Product, {through: Sales, foreignKey: 'userId'});
            */

           User.belongsToMany(Product, { through: Sales})
           Product.belongsToMany(User, { through: Sales})
         
            const result = await User.findAll({
                include: [
                    { model: Product}
                ],
                raw: true,
                nest: true
            });

            res.send(result)
        } catch(error){
            console.log(error);
            
            res.send(error);
        }   
            
    }

    public where(req: Request, res: Response){

        Product.findAll({
            where: {
                id: {
                    [Op.gt]: 0
                },
                title: {
                    [Op.like] : '%V%'
                },
                price: {
                    [Op.gt] :200
                }
            },
            raw: true        
        })
        .then((users) => console.log(users))
        .catch((err) => console.log(err));
    }

    public async create(req: Request, res: Response) {

        const params = req.body;
        
        try{

            const result = await User.create(params)
            res.send(result);
            
            if(result){
                res.sendStatus(202);
            }else{
                res.sendStatus(404);
            }


        } catch (error){
            console.log(error);
            res.send(error);
        }

    }
    
    public async delete(req: Request, res: Response) {

        try{

            const result = await User.destroy({
                where: {
                    // criteria
                    id: req.params.id
                }
            })
            
            if(result){
                res.sendStatus(202);
            }else{
                res.sendStatus(404);
            }


        } catch (error){
            console.log(error);
            res.send(error);
        }
    }

    public async update(req: Request, res: Response) {

        try{

            const result = await User.update( 
                { name: 'a very different title now' },
                { where: { id: 4 } 
            });
            
            if(result){
                res.sendStatus(202);
            }else{
                res.sendStatus(404);
            }


        } catch (error){
            console.log(error);
            res.send(error);
        }
    }

    public async partial(req: Request, res: Response) {

        try{
            
            const result = await User.update( 
                { 
                    name: req.body.name,
                    familyName: req.body.familyName,
                },
                { where: { id: req.params.id } 
            });
            
            if(result){
                res.sendStatus(202);
            }else{
                res.sendStatus(404);
            }


        } catch (error){
            console.log(error);
            res.send(error);
        }
    }
}

export const usersController = new UsersController();