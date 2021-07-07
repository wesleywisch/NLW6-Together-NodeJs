import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload{
    sub: string;
}

export function ensureAuthenticated( req: Request, res: Response, next: NextFunction){
    
    //Receber o Token
    const authtoken = req.headers.authorization;

    //Validar se token está preenchido
    if(!authtoken){
        return res.status(401).end();
    }

    const [, token] = authtoken.split(" ");

    try{
    //Validar se token é valido
        const { sub } = verify(token, "TokenSecret") as IPayload;

    //Recuperar informações do usuário
        req.user_id = sub

        return next();
    }catch(err){
        return res.status(401).end();
    }

}