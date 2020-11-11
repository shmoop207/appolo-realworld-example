"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
const profileService_1 = require("../services/profileService");
const userDecorator_1 = require("../../user/decorators/userDecorator");
const authMiddleware_1 = require("../../user/middlwares/authMiddleware");
let ProfileController = class ProfileController {
    async getProfile(userId, username) {
        let profile = await this.profileService.findProfile(userId, username);
        return { profile };
    }
    async follow(email, username) {
        let profile = await this.profileService.follow(email, username);
        return { profile };
    }
    async unFollow(userId, username) {
        let profile = await this.profileService.unFollow(userId, username);
        return { profile };
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", profileService_1.ProfileService)
], ProfileController.prototype, "profileService", void 0);
tslib_1.__decorate([
    route_1.get(':username'),
    tslib_1.__param(0, userDecorator_1.user('id')), tslib_1.__param(1, route_1.param()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfile", null);
tslib_1.__decorate([
    route_1.post(':username/follow'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, userDecorator_1.user('email')), tslib_1.__param(1, route_1.param()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProfileController.prototype, "follow", null);
tslib_1.__decorate([
    route_1.del(':username/follow'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, userDecorator_1.user('id')), tslib_1.__param(1, route_1.param()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProfileController.prototype, "unFollow", null);
ProfileController = tslib_1.__decorate([
    route_1.controller('profiles')
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profileController.js.map