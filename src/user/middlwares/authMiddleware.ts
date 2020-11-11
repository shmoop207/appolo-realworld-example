import {Middleware, IRequest, IResponse, NextFn, UnauthorizedError} from '@appolo/route';
import {define, inject} from '@appolo/inject';
import * as jwt from 'jsonwebtoken';

import {UserService} from '../services/userService';
import {IEnv} from "../../../config/env/IEnv";

@define()
export class AuthMiddleware extends Middleware {

    @inject() env: IEnv
    @inject() userService: UserService

    async run(req: IRequest, res: IResponse, next: NextFn) {
        const authHeaders = req.headers.authorization;

        if (authHeaders && (authHeaders as string).split(' ')[1]) {
            const token = (authHeaders as string).split(' ')[1];
            const decoded: any = jwt.verify(token, this.env.secret);
            const user = await this.userService.findById(decoded.id);

            if (!user) {
                return next(new UnauthorizedError('User not found.'));
            }

            req.user = user;
            next();

        } else {
            next(new UnauthorizedError('Not authorized.'));
        }
    }
}
