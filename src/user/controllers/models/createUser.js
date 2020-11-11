"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const tslib_1 = require("tslib");
const validator_1 = require("@appolo/validator");
class CreateUser {
}
tslib_1.__decorate([
    validator_1.string().required(),
    tslib_1.__metadata("design:type", String)
], CreateUser.prototype, "username", void 0);
tslib_1.__decorate([
    validator_1.string().required(),
    tslib_1.__metadata("design:type", String)
], CreateUser.prototype, "email", void 0);
tslib_1.__decorate([
    validator_1.string().required(),
    tslib_1.__metadata("design:type", String)
], CreateUser.prototype, "password", void 0);
exports.CreateUser = CreateUser;
//# sourceMappingURL=createUser.js.map