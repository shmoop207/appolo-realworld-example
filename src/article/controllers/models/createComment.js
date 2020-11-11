"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComment = void 0;
const tslib_1 = require("tslib");
const validator_1 = require("@appolo/validator");
class CreateComment {
}
tslib_1.__decorate([
    validator_1.string().required(),
    tslib_1.__metadata("design:type", String)
], CreateComment.prototype, "body", void 0);
exports.CreateComment = CreateComment;
//# sourceMappingURL=createComment.js.map