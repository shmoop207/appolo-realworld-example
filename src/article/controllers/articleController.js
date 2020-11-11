"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
const validator_1 = require("@appolo/validator");
const articleService_1 = require("../services/articleService");
const userDecorator_1 = require("../../user/decorators/userDecorator");
const createArticle_1 = require("./models/createArticle");
const updateArticle_1 = require("./models/updateArticle");
const createComment_1 = require("./models/createComment");
const getAllArticles_1 = require("./models/getAllArticles");
const authMiddleware_1 = require("../../user/middlwares/authMiddleware");
const commentsService_1 = require("../services/commentsService");
const favoriteService_1 = require("../services/favoriteService");
let ArticleController = class ArticleController {
    async findAll(query) {
        let { results, count } = await this.articleService.findAll(query);
        return { articles: results, articlesCount: count };
    }
    async getFeed(userId, query) {
        let { results, count } = await this.articleService.findFeed(userId, query);
        return { articles: results, articlesCount: count };
    }
    async findOne(slug) {
        let article = await this.articleService.findOne({ slug });
        return { article };
    }
    async findComments(slug) {
        let comments = await this.commentsService.findComments(slug);
        return { comments };
    }
    async create(userId, articleData) {
        let article = await this.articleService.create(userId, articleData);
        return { article };
    }
    async update(slug, articleData) {
        let article = await this.articleService.update(slug, articleData);
        return { article };
    }
    async delete(slug) {
        return this.articleService.delete(slug);
    }
    async createComment(userId, slug, commentData) {
        let comment = await this.commentsService.addComment(userId, slug, commentData);
        return { comment };
    }
    async deleteComment(params) {
        const { slug, id } = params;
        let article = await this.commentsService.deleteComment(slug, id);
        return { article };
    }
    async favorite(userId, slug) {
        let article = await this.favoriteService.favorite(userId, slug);
        return { article };
    }
    async unFavorite(userId, slug) {
        let article = await this.favoriteService.unFavorite(userId, slug);
        return { article };
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", articleService_1.ArticleService)
], ArticleController.prototype, "articleService", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", commentsService_1.CommentsService)
], ArticleController.prototype, "commentsService", void 0);
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", favoriteService_1.FavoriteService)
], ArticleController.prototype, "favoriteService", void 0);
tslib_1.__decorate([
    route_1.get("/"),
    tslib_1.__param(0, route_1.query()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [getAllArticles_1.GetAllArticles]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "findAll", null);
tslib_1.__decorate([
    route_1.get('feed'),
    tslib_1.__param(0, userDecorator_1.user('id')), tslib_1.__param(1, route_1.query()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, getAllArticles_1.GetFeedArticles]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "getFeed", null);
tslib_1.__decorate([
    route_1.get(':slug'),
    tslib_1.__param(0, route_1.param()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "findOne", null);
tslib_1.__decorate([
    route_1.get(':slug/comments'),
    tslib_1.__param(0, route_1.param()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "findComments", null);
tslib_1.__decorate([
    route_1.post("/"),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, userDecorator_1.user("id")), tslib_1.__param(1, validator_1.validate()), tslib_1.__param(1, route_1.body('article')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, createArticle_1.CreateArticle]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "create", null);
tslib_1.__decorate([
    route_1.put(':slug'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, route_1.param()), tslib_1.__param(1, validator_1.validate()), tslib_1.__param(1, route_1.body('article')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, updateArticle_1.UpdateArticle]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "update", null);
tslib_1.__decorate([
    route_1.del(':slug'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, route_1.param()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "delete", null);
tslib_1.__decorate([
    route_1.post(':slug/comments'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, userDecorator_1.user("id")), tslib_1.__param(1, route_1.param()), tslib_1.__param(2, route_1.body('comment')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, createComment_1.CreateComment]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "createComment", null);
tslib_1.__decorate([
    route_1.del(':slug/comments/:id'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, route_1.params()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "deleteComment", null);
tslib_1.__decorate([
    route_1.post(':slug/favorite'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, userDecorator_1.user('id')), tslib_1.__param(1, route_1.param()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "favorite", null);
tslib_1.__decorate([
    route_1.del(':slug/favorite'),
    route_1.middleware(authMiddleware_1.AuthMiddleware),
    tslib_1.__param(0, userDecorator_1.user('id')), tslib_1.__param(1, route_1.param()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ArticleController.prototype, "unFavorite", null);
ArticleController = tslib_1.__decorate([
    route_1.controller('/articles')
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=articleController.js.map