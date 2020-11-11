"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const typeorm_1 = require("@appolo/typeorm");
const article_1 = require("../models/article");
const comment_1 = require("../models/comment");
const user_1 = require("../../user/models/user");
const followsEntity_1 = require("../../profile/models/followsEntity");
let CommentsService = class CommentsService {
    async addComment(userId, slug, commentData) {
        let article = await this.articleRepository.findOne({ slug });
        let author = await this.userRepository.findOne({ where: { id: userId } });
        const comment = new comment_1.Comment();
        comment.body = commentData.body;
        comment.author = author;
        article.comments.push(comment);
        await this.commentRepository.save(comment);
        article = await this.articleRepository.save(article);
        return comment;
    }
    async deleteComment(slug, id) {
        let article = await this.articleRepository.findOne({ slug });
        const comment = await this.commentRepository.findOne(id);
        const deleteIndex = article.comments.findIndex(_comment => _comment.id === comment.id);
        if (deleteIndex >= 0) {
            const deleteComments = article.comments.splice(deleteIndex, 1);
            await this.commentRepository.delete(deleteComments[0].id);
            article = await this.articleRepository.save(article);
        }
        return article;
    }
    async findComments(slug) {
        let article = await this.articleRepository.findOne({ slug });
        const comments = await this.commentRepository.find({ where: { article: article.id }, relations: ["author"] });
        return comments;
    }
};
tslib_1.__decorate([
    typeorm_1.model(article_1.Article),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], CommentsService.prototype, "articleRepository", void 0);
tslib_1.__decorate([
    typeorm_1.model(comment_1.Comment),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], CommentsService.prototype, "commentRepository", void 0);
tslib_1.__decorate([
    typeorm_1.model(user_1.User),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], CommentsService.prototype, "userRepository", void 0);
tslib_1.__decorate([
    typeorm_1.model(followsEntity_1.FollowsEntity),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], CommentsService.prototype, "followsRepository", void 0);
CommentsService = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=commentsService.js.map