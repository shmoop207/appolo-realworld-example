"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("@appolo/typeorm");
const article_1 = require("./article");
const user_1 = require("../../user/models/user");
let Comment = class Comment {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Comment.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "body", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => article_1.Article, article => article.comments),
    tslib_1.__metadata("design:type", article_1.Article)
], Comment.prototype, "article", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => user_1.User),
    tslib_1.__metadata("design:type", user_1.User)
], Comment.prototype, "author", void 0);
Comment = tslib_1.__decorate([
    typeorm_1.Entity(),
    typeorm_1.model()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map