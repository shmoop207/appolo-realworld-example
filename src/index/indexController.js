"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
let IndexController = class IndexController {
    async index(req, res) {
        res.render("./public/index.html");
    }
};
tslib_1.__decorate([
    route_1.get("*"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexController.prototype, "index", null);
IndexController = tslib_1.__decorate([
    route_1.controller()
], IndexController);
exports.IndexController = IndexController;
//# sourceMappingURL=indexController.js.map