import { Request, Response } from 'express';
import { User, UserInterface } from '../models/user';

class UsersController {

    public index(req: Request, res: Response) {
        User.findAll<User>({})
        .then((nodes: Array<User>) => res.json(nodes))
        .catch((err: Error) => res.status(500).json(err));
    }

    public create(req: Request, res: Response) {
        res.send('ok');
    }
}

export const usersController = new UsersController();