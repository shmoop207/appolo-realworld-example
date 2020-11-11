"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const serve = require("serve-static");
const path = require("path");
const cors = require("cors");
module.exports = function (app) {
    app.route.use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .use(cors())
        .use(serve(path.join(__dirname, "../../public")));
};
//# sourceMappingURL=all.js.map