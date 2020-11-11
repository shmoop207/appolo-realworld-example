"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const typeorm_1 = require("@appolo/typeorm");
const article_1 = require("../models/article");
const comment_1 = require("../models/comment");
const user_1 = require("../../user/models/user");
const followsEntity_1 = require("../../profile/models/followsEntity");
let FavoriteService = class FavoriteService {
    async favorite(id, slug) {
        let article = await this.articleRepository.findOne({ slug });
        const user = await this.userRepository.findOne(id, { relations: ["favorites"] });
        const isNewFavorite = user.favorites.findIndex(_article => _article.id === article.id) < 0;
        if (isNewFavorite) {
            user.favorites.push(article);
            article.favoritesCount++;
            await this.userRepository.save(user);
            article = await this.articleRepository.save(article);
        }
        return article;
    }
    async unFavorite(id, slug) {
        let article = await this.articleRepository.findOne({ slug });
        const user = await this.userRepository.findOne(id, { relations: ["favorites"] });
        const deleteIndex = user.favorites.findIndex(_article => _article.id === article.id);
        if (deleteIndex >= 0) {
            user.favorites.splice(deleteIndex, 1);
            article.favoritesCount--;
            await this.userRepository.save(user);
            article = await this.articleRepository.save(article);
        }
        return article;
    }
};
tslib_1.__decorate([
    typeorm_1.model(article_1.Article),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], FavoriteService.prototype, "articleRepository", void 0);
tslib_1.__decorate([
    typeorm_1.model(comment_1.Comment),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], FavoriteService.prototype, "commentRepository", void 0);
tslib_1.__decorate([
    typeorm_1.model(user_1.User),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], FavoriteService.prototype, "userRepository", void 0);
tslib_1.__decorate([
    typeorm_1.model(followsEntity_1.FollowsEntity),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], FavoriteService.prototype, "followsRepository", void 0);
FavoriteService = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], FavoriteService);
exports.FavoriteService = FavoriteService;
//# sourceMappingURL=favoriteService.js.map