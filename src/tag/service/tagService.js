"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("@appolo/typeorm");
const inject_1 = require("@appolo/inject");
const tag_1 = require("../models/tag");
let TagService = class TagService {
    async findAll() {
        return await this.tagRepository.find();
    }
};
tslib_1.__decorate([
    typeorm_1.model(tag_1.Tag),
    tslib_1.__metadata("design:type", typeorm_1.Repository)
], TagService.prototype, "tagRepository", void 0);
TagService = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tagService.js.map