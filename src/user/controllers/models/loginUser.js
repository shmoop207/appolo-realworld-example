"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const tslib_1 = require("tslib");
const validator_1 = require("@appolo/validator");
class LoginUser {
}
tslib_1.__decorate([
    validator_1.string().required(),
    tslib_1.__metadata("design:type", String)
], LoginUser.prototype, "email", void 0);
tslib_1.__decorate([
    validator_1.string().required(),
    tslib_1.__metadata("design:type", String)
], LoginUser.prototype, "password", void 0);
exports.LoginUser = LoginUser;
//# sourceMappingURL=loginUser.js.map