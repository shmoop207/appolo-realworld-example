import {define, singleton} from '@appolo/inject';
import {model} from '@appolo/typeorm';
import {Repository} from 'typeorm';
import {User} from '../../user/models/user';
import {DeepPartial} from 'typeorm/common/DeepPartial';
import { IProfile} from '../interface/IProfile';
import {FollowsEntity} from "../models/followsEntity";

@define()
@singleton()
export class ProfileService {

    @model(User) private readonly userRepository: Repository<User>
    @model(FollowsEntity) private readonly followsRepository: Repository<FollowsEntity>

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(options?: DeepPartial<User>): Promise<IProfile> {
        const user = await this.userRepository.findOne(options);
        delete user.id;
        if (user) delete user.password;

        return user;
    }

    async findProfile(id: number, followingUsername: string): Promise<IProfile> {
        const _profile = await this.userRepository.findOne({username: followingUsername});

        if (!_profile) return;

        let profile: IProfile = {
            username: _profile.username,
            bio: _profile.bio,
            image: _profile.image
        };

        const follows = await this.followsRepository.findOne({followerId: id, followingId: _profile.id});

        if (id) {
            profile.following = !!follows;
        }

        return profile;
    }

    async follow(followerEmail: string, username: string): Promise<IProfile> {


        const followingUser = await this.userRepository.findOne({username});
        const followerUser = await this.userRepository.findOne({email: followerEmail});

        if (followingUser.email === followerEmail) {
            throw new Error('FollowerEmail and FollowingId cannot be equal.');
        }

        const _follows = await this.followsRepository.findOne({
            followerId: followerUser.id,
            followingId: followingUser.id
        });

        if (!_follows) {
            const follows = new FollowsEntity();
            follows.followerId = followerUser.id;
            follows.followingId = followingUser.id;
            await this.followsRepository.save(follows);
        }

        let profile: IProfile = {
            username: followingUser.username,
            bio: followingUser.bio,
            image: followingUser.image,
            following: true
        };

        return profile;
    }

    async unFollow(followerId: number, username: string): Promise<IProfile> {


        const followingUser = await this.userRepository.findOne({username});

        if (followingUser.id === followerId) {
            throw new Error('FollowerId and FollowingId cannot be equal.');
        }
        const followingId = followingUser.id;
        await this.followsRepository.delete({followerId, followingId});

        let profile: IProfile = {
            username: followingUser.username,
            bio: followingUser.bio,
            image: followingUser.image,
            following: false
        };

        return profile;
    }

}
