import {inject, define, singleton} from '@appolo/inject';
import {model, Repository, getRepository, DeleteResult} from '@appolo/typeorm';
import {Article} from '../models/article';
import {Comment} from '../models/comment';
import {User} from '../../user/models/user';
import {FollowsEntity} from '../../profile/models/followsEntity';


import slug = require('slug');
import {GetAllArticles, GetFeedArticles} from "../controllers/models/getAllArticles";
import {CreateArticle} from "../controllers/models/createArticle";

@define()
@singleton()
export class ArticleService {

    @model(Article) private readonly articleRepository: Repository<Article>;
    @model(Comment) private readonly commentRepository: Repository<Comment>;
    @model(User) private readonly userRepository: Repository<User>;
    @model(FollowsEntity) private readonly followsRepository: Repository<FollowsEntity>


    public async findAll(query: GetAllArticles): Promise<{ results: Article[], count: number }> {

        const qb = this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.author', 'author');

        qb.where("1 = 1");

        if ('tag' in query) {
            qb.andWhere("article.tagList LIKE :tag", {tag: `%${query.tag}%`});
        }

        if ('author' in query) {
            const author = await this.userRepository.findOne({username: query.author});
            qb.andWhere("article.authorId = :id", {id: author.id});
        }

        if ('favorited' in query) {
            const author = await this.userRepository.findOne({username: query.favorited});
            const ids = author.favorites.map(el => el.id);
            qb.andWhere("article.authorId IN (:ids)", {ids});
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

        return {results, count};
    }

    public async findFeed(userId: number, query: GetFeedArticles): Promise<{ results: Article[], count: number }> {
        const _follows = await this.followsRepository.find({followerId: userId});

        if (!(Array.isArray(_follows) && _follows.length > 0)) {
            return {results: [], count: 0};
        }

        const ids = _follows.map(el => el.followingId);

        const qb = await getRepository(Article)
            .createQueryBuilder('article')
            .where('article.authorId IN (:ids)', {ids});

        qb.orderBy('article.createdAt', 'DESC');

        const articlesCount = await qb.getCount();

        if ('limit' in query) {
            qb.limit(query.limit);
        }

        if ('offset' in query) {
            qb.offset(query.offset);
        }

        const articles = await qb.getMany();

        return {results: articles, count: articlesCount};
    }

    public async findOne(where): Promise<Article> {
        const article = await this.articleRepository.findOne(where,{relations:["author"]});
        return article
    }



    async create(userId: number, articleData: CreateArticle): Promise<Article> {

        let article = new Article();
        article.title = articleData.title;
        article.description = articleData.description;
        article.slug = this.slugify(articleData.title);
        article.tagList = articleData.tagList || [];
        article.comments = [];
        article.body = articleData.body;

        const newArticle = await this.articleRepository.save(article);

        const author = await this.userRepository.findOne({where: {id: userId}, relations: ['articles']});
        author.articles.push(article);

        await this.userRepository.save(author);

        return newArticle;

    }

    async update(slug: string, articleData: any): Promise<Article> {
        let toUpdate = await this.articleRepository.findOne({slug: slug});
        let updated = Object.assign(toUpdate, articleData);
        const article = await this.articleRepository.save(updated);
        return article;
    }

    async delete(slug: string): Promise<DeleteResult> {
        return await this.articleRepository.delete({slug: slug});
    }

    slugify(title: string) {
        return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
    }
}
