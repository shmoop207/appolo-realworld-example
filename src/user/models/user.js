"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("@appolo/typeorm");
const argon2 = require("argon2");
const article_1 = require("../../article/models/article");
let User = class User {
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "bio", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "image", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
tslib_1.__decorate([
    typeorm_1.ManyToMany(type => article_1.Article),
    typeorm_1.JoinTable(),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "favorites", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => article_1.Article, article => article.author),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "articles", void 0);
User = tslib_1.__decorate([
    typeorm_1.Entity('user'),
    typeorm_1.model()
], User);
exports.User = User;
//# sourceMappingURL=user.js.map