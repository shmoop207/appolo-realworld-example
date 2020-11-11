import {get, post, body, put, del, query, param, controller, params, middleware} from '@appolo/route';
import {inject} from '@appolo/inject';
import {validate} from '@appolo/validator';
import {ArticleService} from '../services/articleService';
import {user} from '../../user/decorators/userDecorator';
import {CreateArticle} from "./models/createArticle";
import {UpdateArticle} from "./models/updateArticle";
import {CreateComment} from "./models/createComment";
import {GetAllArticles, GetFeedArticles} from "./models/getAllArticles";
import {AuthMiddleware} from "../../user/middlwares/authMiddleware";
import {CommentsService} from "../services/commentsService";
import {FavoriteService} from "../services/favoriteService";

@controller('/articles')
export class ArticleController {

    @inject() private articleService: ArticleService
    @inject() private commentsService: CommentsService;
    @inject() private favoriteService: FavoriteService;


    @get("/")
    async findAll(@query() query: GetAllArticles) {
        let {results, count} = await this.articleService.findAll(query);

        return {articles: results, articlesCount: count}
    }


    @get('feed')
    async getFeed(@user('id') userId: number, @query() query: GetFeedArticles) {
        let {results, count} = await this.articleService.findFeed(userId, query);

        return {articles: results, articlesCount: count}
    }

    @get(':slug')
    async findOne(@param() slug: string) {
        let article = await this.articleService.findOne({slug});
        return {article}
    }

    @get(':slug/comments')
    async findComments(@param() slug: string) {
        let comments = await this.commentsService.findComments(slug);

        return {comments}
    }


    @post("/")
    @middleware(AuthMiddleware)
    async create(@user("id") userId: number, @validate() @body('article') articleData: CreateArticle) {
        let article = await this.articleService.create(userId, articleData);
        return {article}
    }


    @put(':slug')
    @middleware(AuthMiddleware)
    async update(@param() slug: string, @validate() @body('article') articleData: UpdateArticle) {
        let article = await this.articleService.update(slug, articleData);

        return {article}
    }


    @del(':slug')
    @middleware(AuthMiddleware)
    async delete(@param() slug: string) {
        return this.articleService.delete(slug);
    }


    @post(':slug/comments')
    @middleware(AuthMiddleware)
    async createComment(@user("id") userId: string , @param() slug, @body('comment') commentData: CreateComment) {
        let comment = await this.commentsService.addComment(userId,slug, commentData);

        return {comment}
    }


    @del(':slug/comments/:id')
    @middleware(AuthMiddleware)
    async deleteComment(@params() params: { slug: string, id: string }) {
        const {slug, id} = params;
        let article = await this.commentsService.deleteComment(slug, id);

        return {article}
    }

    @post(':slug/favorite')
    @middleware(AuthMiddleware)
    async favorite(@user('id') userId: number, @param() slug: string) {
        let article = await this.favoriteService.favorite(userId, slug);

        return {article}
    }


    @del(':slug/favorite')
    @middleware(AuthMiddleware)
    async unFavorite(@user('id') userId: number, @param() slug: string) {
        let article = await this.favoriteService.unFavorite(userId, slug);

        return {article}
    }

}
