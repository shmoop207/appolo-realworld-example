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
export class FavoriteService {

    @model(Article) private readonly articleRepository: Repository<Article>;
    @model(Comment) private readonly commentRepository: Repository<Comment>;
    @model(User) private readonly userRepository: Repository<User>;
    @model(FollowsEntity) private readonly followsRepository: Repository<FollowsEntity>


    public async favorite(id: number, slug: string): Promise<Article> {
        let article = await this.articleRepository.findOne({slug});
        const user = await this.userRepository.findOne(id,{relations:["favorites"]});

        const isNewFavorite = user.favorites.findIndex(_article => _article.id === article.id) < 0;
        if (isNewFavorite) {
            user.favorites.push(article);
            article.favoritesCount++;

            await this.userRepository.save(user);
            article = await this.articleRepository.save(article);
        }

        return article;
    }

    public async unFavorite(id: number, slug: string): Promise<Article> {
        let article = await this.articleRepository.findOne({slug});
        const user = await this.userRepository.findOne(id,{relations:["favorites"]});

        const deleteIndex = user.favorites.findIndex(_article => _article.id === article.id);

        if (deleteIndex >= 0) {

            user.favorites.splice(deleteIndex, 1);
            article.favoritesCount--;

            await this.userRepository.save(user);
            article = await this.articleRepository.save(article);
        }

        return article;
    }


}
