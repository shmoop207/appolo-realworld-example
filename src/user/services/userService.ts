import {model} from '@appolo/typeorm';
import {define, singleton, inject} from '@appolo/inject';
import {Repository, getRepository, DeleteResult} from 'typeorm';
import {User} from '../models/user';

import jwt = require('jsonwebtoken');
import * as argon2 from 'argon2';
import {IEnv} from "../../../config/env/IEnv";
import {LoginUser} from "../controllers/models/loginUser";
import {CreateUser} from "../controllers/models/createUser";
import {UpdateUser} from "../controllers/models/updateUser";

@define()
@singleton()
export class UserService {

    @model(User) private readonly userRepository: Repository<User>
    @inject() private readonly env: IEnv

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne({email, password}: LoginUser): Promise<User> {
        const user = await this.userRepository.findOne({email});
        if (!user) {
            return null;
        }

        if (await argon2.verify(user.password, password)) {
            return user;
        }

        return null;
    }

    async create(dto: CreateUser): Promise<User> {

        // check uniqueness of username/email
        const {username, email, password} = dto;
        const qb = await getRepository(User)
            .createQueryBuilder('user')
            .where('user.username = :username', {username})
            .orWhere('user.email = :email', {email});

        const user = await qb.getOne();

        if (user) {
            throw new Error('Username and email must be unique.');

        }

        // create new user
        let newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.articles = [];

        const savedUser = await this.userRepository.save(newUser);
        return savedUser
    }

    async update(id: number, dto: UpdateUser): Promise<User> {
        let toUpdate = await this.userRepository.findOne(id);
        delete toUpdate.password;
        delete toUpdate.favorites;

        let updated = Object.assign(toUpdate, dto);
        return await this.userRepository.save(updated);
    }

    async delete(email: string): Promise<DeleteResult> {
        return await this.userRepository.delete({email: email});
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id);

        return user
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({email: email});
        return user
    }

    public generateJWT(user) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: exp.getTime() / 1000,
        }, this.env.secret);
    };


}
