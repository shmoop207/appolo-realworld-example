"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
const tagService_1 = require("../service/tagService");
let TagController = class TagController {
    async findAll() {
        let tags = await this.tagService.findAll();
        return { tags };
    }
};
tslib_1.__decorate([
    inject_1.inject(),
    tslib_1.__metadata("design:type", tagService_1.TagService)
], TagController.prototype, "tagService", void 0);
tslib_1.__decorate([
    route_1.get("/"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TagController.prototype, "findAll", null);
TagController = tslib_1.__decorate([
    route_1.controller('tags')
], TagController);
exports.TagController = TagController;
//# sourceMappingURL=tagController.js.map