import { Request, Response, NextFunction } from "express";
import config from '../config/config.json';
import * as jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

  // Cogemos el token que llega por los headers de nuestras peticiones protegidas
  const token = <string>req.headers["authorization"];
  
  //Vamos a intentar verificar el token que ha llegado
  try {
    let jwtPayload;
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;

  } catch (error) {
    // si el token no es válido, resondemos con 401 (unauthorized)
    res.status(401).send();
    return;
  }

  // Si no hemos devuelto 404, permitimos que siga la petición inicial
  next();

  
};