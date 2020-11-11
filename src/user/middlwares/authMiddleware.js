"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
const jwt = require("jsonwebtoken");
const userService_1 = require("../services/userService");
let AuthMiddleware = class AuthMiddleware extends route_1.Middleware {
    async run(req, res, next) {
        const authHeaders = req.headers.authorization;
        if (authHeaders && authHeaders.split(' ')[1]) {
            const token = authHeaders.split(' ')[1];
            const decoded = jwt.verify(token, this.env.secret);
            const user = await this.userService.findById(decoded.id);
            if (!user) {
                return next(new route_1.UnauthorizedError('User not found.'));
            }
            req.user = user;
            next();
        }
        else {
            next(new route_1.UnauthorizedError('Not authorized.'));
        }
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", Object)
], AuthMiddleware.prototype, "env", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", userService_1.UserService)
], AuthMiddleware.prototype, "userService", void 0);
AuthMiddleware = tslib_1.__decorate([
    inject_1.define()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map