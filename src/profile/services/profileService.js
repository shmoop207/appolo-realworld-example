"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const typeorm_1 = require("@appolo/typeorm");
const typeorm_2 = require("typeorm");
const user_1 = require("../../user/models/user");
const followsEntity_1 = require("../models/followsEntity");
let ProfileService = class ProfileService {
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(options) {
        const user = await this.userRepository.findOne(options);
        delete user.id;
        if (user)
            delete user.password;
        return user;
    }
    async findProfile(id, followingUsername) {
        const _profile = await this.userRepository.findOne({ username: followingUsername });
        if (!_profile)
            return;
        let profile = {
            username: _profile.username,
            bio: _profile.bio,
            image: _profile.image
        };
        const follows = await this.followsRepository.findOne({ followerId: id, followingId: _profile.id });
        if (id) {
            profile.following = !!follows;
        }
        return profile;
    }
    async follow(followerEmail, username) {
        const followingUser = await this.userRepository.findOne({ username });
        const followerUser = await this.userRepository.findOne({ email: followerEmail });
        if (followingUser.email === followerEmail) {
            throw new Error('FollowerEmail and FollowingId cannot be equal.');
        }
        const _follows = await this.followsRepository.findOne({
            followerId: followerUser.id,
            followingId: followingUser.id
        });
        if (!_follows) {
            const follows = new followsEntity_1.FollowsEntity();
            follows.followerId = followerUser.id;
            follows.followingId = followingUser.id;
            await this.followsRepository.save(follows);
        }
        let profile = {
            username: followingUser.username,
            bio: followingUser.bio,
            image: followingUser.image,
            following: true
        };
        return profile;
    }
    async unFollow(followerId, username) {
        const followingUser = await this.userRepository.findOne({ username });
        if (followingUser.id === followerId) {
            throw new Error('FollowerId and FollowingId cannot be equal.');
        }
        const followingId = followingUser.id;
        await this.followsRepository.delete({ followerId, followingId });
        let profile = {
            username: followingUser.username,
            bio: followingUser.bio,
            image: followingUser.image,
            following: false
        };
        return profile;
    }
};
tslib_1.__decorate([
    typeorm_1.model(user_1.User),
    tslib_1.__metadata("design:type", typeorm_2.Repository)
], ProfileService.prototype, "userRepository", void 0);
tslib_1.__decorate([
    typeorm_1.model(followsEntity_1.FollowsEntity),
    tslib_1.__metadata("design:type", typeorm_2.Repository)
], ProfileService.prototype, "followsRepository", void 0);
ProfileService = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profileService.js.map