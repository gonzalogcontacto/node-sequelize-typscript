import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

class UsersRoutes {

    public router: Router = Router();
    
    constructor(){
        this.router.get('/', usersController.index);
        this.router.get('/show/:id', usersController.show);
        this.router.get('/where', usersController.where);
        this.router.post('/add', usersController.create);
    }
}

const clientsRoutes = new UsersRoutes();
export default clientsRoutes.router;