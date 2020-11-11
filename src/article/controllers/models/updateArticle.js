"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticle = void 0;
const tslib_1 = require("tslib");
const validator_1 = require("@appolo/validator");
class UpdateArticle {
}
tslib_1.__decorate([
    validator_1.string().optional(),
    tslib_1.__metadata("design:type", String)
], UpdateArticle.prototype, "title", void 0);
tslib_1.__decorate([
    validator_1.string().optional(),
    tslib_1.__metadata("design:type", String)
], UpdateArticle.prototype, "description", void 0);
tslib_1.__decorate([
    validator_1.string().optional(),
    tslib_1.__metadata("design:type", String)
], UpdateArticle.prototype, "body", void 0);
exports.UpdateArticle = UpdateArticle;
//# sourceMappingURL=updateArticle.js.map