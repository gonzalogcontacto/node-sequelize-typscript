import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import { checkJwt } from "../middlewares/checkJwt";

class UsersRoutes {

    public router: Router = Router();
    
    constructor(){
        
        this.router.get('/sales',[checkJwt], usersController.sales);


        this.router.get('/show/:id', usersController.show);
        this.router.get('/where', usersController.where);
        this.router.post('/',[checkJwt], usersController.create);
        this.router.post('/remove', usersController.delete);
        this.router.delete('/:id', usersController.delete);
        this.router.put('/:id', usersController.update);
        this.router.get('/:id/sales', usersController.salesOfUser);
        
    }
}

const clientsRoutes = new UsersRoutes();
export default clientsRoutes.router;