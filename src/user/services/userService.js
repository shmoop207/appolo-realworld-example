"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("@appolo/typeorm");
const inject_1 = require("@appolo/inject");
const typeorm_2 = require("typeorm");
const user_1 = require("../models/user");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
let UserService = class UserService {
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne({ email, password }) {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            return null;
        }
        if (await argon2.verify(user.password, password)) {
            return user;
        }
        return null;
    }
    async create(dto) {
        // check uniqueness of username/email
        const { username, email, password } = dto;
        const qb = await typeorm_2.getRepository(user_1.User)
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email = :email', { email });
        const user = await qb.getOne();
        if (user) {
            throw new Error('Username and email must be unique.');
        }
        // create new user
        let newUser = new user_1.User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.articles = [];
        const savedUser = await this.userRepository.save(newUser);
        return savedUser;
    }
    async update(id, dto) {
        let toUpdate = await this.userRepository.findOne(id);
        delete toUpdate.password;
        delete toUpdate.favorites;
        let updated = Object.assign(toUpdate, dto);
        return await this.userRepository.save(updated);
    }
    async delete(email) {
        return await this.userRepository.delete({ email: email });
    }
    async findById(id) {
        const user = await this.userRepository.findOne(id);
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ email: email });
        return user;
    }
    generateJWT(user) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: exp.getTime() / 1000,
        }, this.env.secret);
    }
    ;
};
tslib_1.__decorate([
    typeorm_1.model(user_1.User),
    tslib_1.__metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "userRepository", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", Object)
], UserService.prototype, "env", void 0);
UserService = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map