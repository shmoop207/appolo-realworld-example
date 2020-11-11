import {get, post, body, put, del, param, controller, middleware,UnauthorizedError} from '@appolo/route';
import {inject} from '@appolo/inject';
import {UserService} from '../services/userService';
import {user} from '../decorators/userDecorator';
import {validate} from '@appolo/validator';
import {User} from "../models/user";
import {UpdateUser} from "./models/updateUser";
import {CreateUser} from "./models/createUser";
import {LoginUser} from "./models/loginUser";
import {AuthMiddleware} from "../middlwares/authMiddleware";

@controller()
export class UserController {

   @inject() userService: UserService

    @get('/user')
    @middleware(AuthMiddleware)
    async findMe(@user('email') email: string){
        let user =  await this.userService.findByEmail(email);

        return {user:this._buildUserDto(user)}

    }

    @put('/user')
    @middleware(AuthMiddleware)
    async update(@user('id') userId: number, @validate() @body("user") userData: UpdateUser) {
        let user = await this.userService.update(userId, userData);
        return {user: this._buildUserDto(user)}

    }

    @post('/users')
    async create(@validate() @body('user') userData: CreateUser) {
        let user = await this.userService.create(userData);

        return {user: this._buildUserDto(user)}

    }

    @del('/users/:slug')
    @middleware(AuthMiddleware)
    async delete(@param() slug: string) {
        return await this.userService.delete(slug);
    }

    @post('/users/login')
    async login(@validate() @body("user") loginUserDto: LoginUser) {
        const user = await this.userService.findOne(loginUserDto);


        if (!user) {
            throw new UnauthorizedError("user not found");
        }


        return {user: this._buildUserDto(user)}
    }

    private _buildUserDto(user: User) {
        const userDto = {
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            token: this.userService.generateJWT(user),
            image: user.image
        };

        return userDto;
    }
}
