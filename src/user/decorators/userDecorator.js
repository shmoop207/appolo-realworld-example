"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const route_1 = require("@appolo/route");
const jwt = require("jsonwebtoken");
exports.user = (param) => route_1.customRouteParam((req, res) => {
    // if route is protected, there is a user set in auth.middleware
    if (!!req.user) {
        return param ? req.user[param] : req.user;
    }
    // in case a route is not protected, we still want to get the optional auth user from jwt
    const token = req.headers.authorization ? req.headers.authorization.split(' ') : null;
    if (token && token[1]) {
        const decoded = jwt.verify(token[1], req.app.env.secret);
        return param ? decoded[param] : decoded;
    }
});
//# sourceMappingURL=userDecorator.js.map