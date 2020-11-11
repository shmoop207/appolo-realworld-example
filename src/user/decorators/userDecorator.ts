import {customRouteParam, IRequest, IResponse} from '@appolo/route';
import * as jwt from 'jsonwebtoken';
import {IEnv} from "../../../config/env/IEnv";
import {User} from "../models/user";


export const user =(param?:keyof User)=> customRouteParam((req: IRequest, res: IResponse) => {
    // if route is protected, there is a user set in auth.middleware
    if (!!req.user) {
        return param ? req.user[param] : req.user;
    }

    // in case a route is not protected, we still want to get the optional auth user from jwt
    const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
    if (token && token[1]) {
        const decoded: any = jwt.verify(token[1], (req.app.env as IEnv).secret);
        return param ? decoded[param] : decoded;
    }
});


declare module "@appolo/route" {
    interface IRequest {
         user:User;
    }
}
