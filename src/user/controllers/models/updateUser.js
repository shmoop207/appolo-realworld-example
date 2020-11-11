"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const tslib_1 = require("tslib");
const validator_1 = require("@appolo/validator");
class UpdateUser {
}
tslib_1.__decorate([
    validator_1.string().optional(),
    tslib_1.__metadata("design:type", String)
], UpdateUser.prototype, "username", void 0);
tslib_1.__decorate([
    validator_1.string().optional(),
    tslib_1.__metadata("design:type", String)
], UpdateUser.prototype, "email", void 0);
tslib_1.__decorate([
    validator_1.string().optional(),
    tslib_1.__metadata("design:type", String)
], UpdateUser.prototype, "bio", void 0);
tslib_1.__decorate([
    validator_1.string().optional(),
    tslib_1.__metadata("design:type", String)
], UpdateUser.prototype, "image", void 0);
exports.UpdateUser = UpdateUser;
//# sourceMappingURL=updateUser.js.map