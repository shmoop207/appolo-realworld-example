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
export class CommentsService {

    @model(Article) private readonly articleRepository: Repository<Article>;
    @model(Comment) private readonly commentRepository: Repository<Comment>;
    @model(User) private readonly userRepository: Repository<User>;
    @model(FollowsEntity) private readonly followsRepository: Repository<FollowsEntity>




    public async addComment(userId: string, slug: string, commentData): Promise<Comment> {
        let article = await this.articleRepository.findOne({slug});
        let author = await this.userRepository.findOne({where: {id: userId}});

        const comment = new Comment();
        comment.body = commentData.body;
        comment.author = author;

        article.comments.push(comment);

        await this.commentRepository.save(comment);
        article = await this.articleRepository.save(article);
        return comment
    }

    async deleteComment(slug: string, id: string): Promise<Article> {
        let article = await this.articleRepository.findOne({slug});

        const comment = await this.commentRepository.findOne(id);
        const deleteIndex = article.comments.findIndex(_comment => _comment.id === comment.id);

        if (deleteIndex >= 0) {
            const deleteComments = article.comments.splice(deleteIndex, 1);
            await this.commentRepository.delete(deleteComments[0].id);
            article = await this.articleRepository.save(article);

        }
        return article

    }


    async findComments(slug: string): Promise<Comment[]> {
        let article = await this.articleRepository.findOne({slug});

        const comments = await this.commentRepository.find({where: {article: article.id}, relations: ["author"]});

        return comments
    }

}
