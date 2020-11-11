"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("@appolo/typeorm");
const user_1 = require("../../user/models/user");
const comment_1 = require("./comment");
let Article = class Article {
    updateTimestamp() {
        this.updatedAt = new Date;
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Article.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Article.prototype, "slug", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Article.prototype, "title", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '' }),
    tslib_1.__metadata("design:type", String)
], Article.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: '' }),
    tslib_1.__metadata("design:type", String)
], Article.prototype, "body", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Article.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Article.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Article.prototype, "updateTimestamp", null);
tslib_1.__decorate([
    typeorm_1.Column('simple-array'),
    tslib_1.__metadata("design:type", Array)
], Article.prototype, "tagList", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => user_1.User, user => user.articles),
    tslib_1.__metadata("design:type", user_1.User)
], Article.prototype, "author", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => comment_1.Comment, comment => comment.article, { eager: true }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", Array)
], Article.prototype, "comments", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Article.prototype, "favoritesCount", void 0);
Article = tslib_1.__decorate([
    typeorm_1.Entity('article'),
    typeorm_1.model()
], Article);
exports.Article = Article;
//# sourceMappingURL=article.js.map