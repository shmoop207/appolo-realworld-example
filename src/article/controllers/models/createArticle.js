"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticle = void 0;
const tslib_1 = require("tslib");
const validator_1 = require("@appolo/validator");
class CreateArticle {
}
tslib_1.__decorate([
    validator_1.string().required(),
    tslib_1.__metadata("design:type", String)
], CreateArticle.prototype, "title", void 0);
tslib_1.__decorate([
    validator_1.string().required(),
    tslib_1.__metadata("design:type", String)
], CreateArticle.prototype, "description", void 0);
tslib_1.__decorate([
    validator_1.string().required(),
    tslib_1.__metadata("design:type", String)
], CreateArticle.prototype, "body", void 0);
tslib_1.__decorate([
    validator_1.array().items(validator_1.string()).optional(),
    tslib_1.__metadata("design:type", Array)
], CreateArticle.prototype, "tagList", void 0);
exports.CreateArticle = CreateArticle;
//# sourceMappingURL=createArticle.js.map