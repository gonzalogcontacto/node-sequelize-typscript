import { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoutes {
    router : Router =  Router();
    
    constructor(){

        //Login route
        this.router.post("/login", AuthController.login);
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;