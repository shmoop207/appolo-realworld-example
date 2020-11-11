"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowsEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("@appolo/typeorm");
let FollowsEntity = class FollowsEntity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], FollowsEntity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], FollowsEntity.prototype, "followerId", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], FollowsEntity.prototype, "followingId", void 0);
FollowsEntity = tslib_1.__decorate([
    typeorm_1.Entity('follows'),
    typeorm_1.model()
], FollowsEntity);
exports.FollowsEntity = FollowsEntity;
//# sourceMappingURL=followsEntity.js.map