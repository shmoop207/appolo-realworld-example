"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const typeorm_1 = require("@appolo/typeorm");
const article_1 = require("../models/article");
const comment_1 = require("../models/comment");
const user_1 = require("../../user/models/user");
const followsEntity_1 = require("../../profile/models/followsEntity");
const slug = require("slug");
let ArticleService = class ArticleService {
    async findAll(query) {
        const qb = this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.author', 'author');
        qb.where("1 = 1");
        if ('tag' in query) {
            qb.andWhere("article.tagList LIKE :tag", { tag: `%${query.tag}%` });
        }
        if ('author' in query) {
            const author = await this.userRepository.findOne({ username: query.author });
            qb.andWhere("article.authorId = :id", { id: author.id });
        }
        if ('favorited' in query) {
            const author = await this.userRepository.findOne({ username: query.favorited });
            const ids = author.favorites.map(el => el.id);
            qb.andWhere("article.authorId IN (:ids)", { ids });
        }
        qb.orderBy('article.createdAt', 'DESC');
        const count = await qb.getCount();
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        if ('offset' in query) {
            qb.offset(query.offset);
        }
        const results = await qb.getMany();
        return { results, count };
    }
    async findFeed(userId, query) {
        const _follows = await this.followsRepository.find({ followerId: userId });
        if (!(Array.isArray(_follows) && _follows.length > 0)) {
            return { results: [], count: 0 };
        }
        const ids = _follows.map(el => el.followingId);
        const qb = await typeorm_1.getRepository(article_1.Article)
            .createQueryBuilder('article')
            .where('article.authorId IN (:ids)', { ids });
        qb.orderBy('article.createdAt', 'DESC');
        const articlesCount = await qb.getCount();
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        if ('offset' in query) {
            qb.offset(query.offset);
        }
        const articles = await qb.getMany();
        return { results: articles, count: articlesCount };
    }
    async findOne(where) {
        const article = await this.articleRepository.findOne(where, { relations: ["author"] });
        return article;
    }
    async create(userId, articleData) {
        let article = new article_1.Article();
        article.title = articleData.title;
        article.description = articleData.description;
        article.slug = this.slugify(articleData.title);
        article.tagList = articleData.tagList || [];
        article.comments = [];
        article.body = articleData.body;
        const newArticle = await this.articleRepository.save(article);
        const author = await this.userRepository.findOne({ where: { id: userId }, relations: ['articles'] });
        author.articles.push(article);
        await this.userRepository.save(author);
        return newArticle;
    }
    async update(slug, articleData) {
        let toUpdate = await this.articleRepository.findOne({ slug: slug });
        let updated = Object.assign(toUpdate, articleData);
        const article = await this.articleRepository.save(updated);
        return article;
    }
    async delete(slug) {
        return await this.articleRepository.delete({ slug: slug });
    }
    slugify(title) {
        return slug(title, { lower: true }) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
    }
};
tslib_1.__decorate([
    typeorm_1.model(article_1.Article),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], ArticleService.prototype, "articleRepository", void 0);
tslib_1.__decorate([
    typeorm_1.model(comment_1.Comment),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], ArticleService.prototype, "commentRepository", void 0);
tslib_1.__decorate([
    typeorm_1.model(user_1.User),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], ArticleService.prototype, "userRepository", void 0);
tslib_1.__decorate([
    typeorm_1.model(followsEntity_1.FollowsEntity),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], ArticleService.prototype, "followsRepository", void 0);
ArticleService = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=articleService.js.map