"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("@appolo/typeorm");
let Tag = class Tag {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Tag.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "tag", void 0);
Tag = tslib_1.__decorate([
    typeorm_1.Entity('tag'),
    typeorm_1.model()
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.js.map