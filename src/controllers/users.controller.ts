import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User, UserInterface } from '../models/user';

class UsersController {

    public index(req: Request, res: Response) {
        
        User.findAll({attributes: ['name']})
        .then((users: Array<User>) => res.json(users))
        .catch((err: Error) => res.status(500).json(err));
    }

    public show(req: Request, res: Response){

        User.findByPk(req.params.id, { raw: true })
        .then((user) => (user) ? res.send(user): console.log(0))
        .catch((err: Error) => res.status(500).json(err));

    }

    public where(req: Request, res: Response){

        User.findAll({
            where: {
                name: {
                    [Op.like] : '%G%'
                },
               id :{
                    [Op.notIn] : [1, 2, 3, 4, 9, 8]
               }
            },
            raw: true 
        })
        .then((user) => (user) ? res.send(user): console.log(0))
        .catch((err: Error) => res.status(500).json(err));
    }

    public create(req: Request, res: Response) {
        const params: UserInterface = req.body;
    
        User.create(params)
          .then((user: User) => res.status(201).json(user))
          .catch((err: Error) => res.status(500).json(err));
    }
}

export const usersController = new UsersController();