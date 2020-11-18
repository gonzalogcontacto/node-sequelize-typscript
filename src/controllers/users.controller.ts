import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User, UserInterface } from '../models/user';
import { Company } from '../models/company';
import { Product } from '../models/product';
import { Provider } from '../models/provider';

class UsersController {

    public async index(req: Request, res: Response) {

        try{
            const user: Array<Product> | null = await Product.findAll();
            
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

            const user: User | null = await User.findByPk(req.params.id, { raw: true });
            console.log(user);
        
            const product: Product | null =  await Product.findByPk(1);
            console.log(product?.providerId);
        
            const provider: Provider | null =  await Provider.findByPk(String(product?.providerId));
            console.log(provider?.slName);

            res.json({product: product ,provider: provider});

        } catch(err) {
            res.sendStatus(500).json(err);
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

    public create(req: Request, res: Response) {
        const params: UserInterface = req.body;
    
        User.create(params)
          .then((user: User) => res.status(201).json(user))
          .catch((err: Error) => res.status(500).json(err));

    }
}

export const usersController = new UsersController();