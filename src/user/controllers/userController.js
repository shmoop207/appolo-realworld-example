"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
const userService_1 = require("../services/userService");
const userDecorator_1 = require("../decorators/userDecorator");
const validator_1 = require("@appolo/validator");
const updateUser_1 = require("./models/updateUser");
const createUser_1 = require("./models/createUser");
const loginUser_1 = require("./models/loginUser");
const authMiddleware_1 = require("../middlwares/authMiddleware");
let UserController = class UserController {
    async findMe(email) {
        let user = await this.userService.findByEmail(email);
        return { user: this._buildUserDto(user) };
    }
    async update(userId, userData) {
        let user = await this.userService.update(userId, userData);
        return { user: this._buildUserDto(user) };
    }
    async create(userData) {
        let user = await this.userService.create(userData);
        return { user: this._buildUserDto(user) };
    }
    async delete(slug) {
        return await this.userService.delete(slug);
    }
    async login(loginUserDto) {
        const user = await this.userService.findOne(loginUserDto);
        if (!user) {
            throw new route_1.UnauthorizedError("user not found");
        }
        return { user: this._buildUserDto(user) };
    }
    _buildUserDto(user) {
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
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", userService_1.UserService)
], UserController.prototype, "userService", void 0);
tslib_1.__decorate([
    route_1.get('/user'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, userDecorator_1.user('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findMe", null);
tslib_1.__decorate([
    route_1.put('/user'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, userDecorator_1.user('id')), tslib_1.__param(1, validator_1.validate()), tslib_1.__param(1, route_1.body("user")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, updateUser_1.UpdateUser]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
tslib_1.__decorate([
    route_1.post('/users'),
    tslib_1.__param(0, validator_1.validate()), tslib_1.__param(0, route_1.body('user')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [createUser_1.CreateUser]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
tslib_1.__decorate([
    route_1.del('/users/:slug'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, route_1.param()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
tslib_1.__decorate([
    route_1.post('/users/login'),
    tslib_1.__param(0, validator_1.validate()), tslib_1.__param(0, route_1.body("user")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [loginUser_1.LoginUser]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = tslib_1.__decorate([
    route_1.controller()
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map