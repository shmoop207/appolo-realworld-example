import {get, post, del, param, controller,middleware} from '@appolo/route';
import {inject} from '@appolo/inject';

import {ProfileService} from '../services/profileService';

import {user} from '../../user/decorators/userDecorator';
import {AuthMiddleware} from "../../user/middlwares/authMiddleware";


@controller('profiles')
export class ProfileController {

    @inject() private readonly profileService: ProfileService

    @get(':username')

    async getProfile(@user('id') userId: number, @param() username: string) {
        let profile = await this.profileService.findProfile(userId, username);
        return {profile}
    }

    @post(':username/follow')
    @middleware(AuthMiddleware)
    async follow(@user('email') email: string, @param() username: string) {
        let profile =  await this.profileService.follow(email, username);

        return {profile}
    }

    @del(':username/follow')
    @middleware(AuthMiddleware)
    async unFollow(@user('id') userId: number, @param() username: string) {
        let profile = await this.profileService.unFollow(userId, username);
        return {profile}
    }

}
