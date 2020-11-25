
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config.json";

class AuthController {
  static login = async (req: Request, res: Response) => {
   
    //Sing JWT, valid for 1 hour
    const token = jwt.sign(

      { email: req.body.email },
        config.jwtSecret,
      { expiresIn: "1h" }

    );

    //Send the jwt in the response
    res.send(token);
  };

}
export default AuthController;