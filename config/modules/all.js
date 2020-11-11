"use strict";
const typeorm_1 = require("@appolo/typeorm");
const view_1 = require("@appolo/view");
const validator_1 = require("@appolo/validator");
const logger_1 = require("@appolo/logger");
module.exports = async function (app, env) {
    await app.module.load(logger_1.LoggerModule);
    app.module.use(view_1.ViewModule.for({ viewEngine: view_1.ViewEngines.ejs }), validator_1.ValidationModule, typeorm_1.TypeOrmModule.for({
        id: "modelRepository",
        config: {
            type: "postgres",
            url: env.postgres,
            extra: {
                ssl: {
                    rejectUnauthorized: false,
                }
            },
            ssl: true,
        }
    }));
};
//# sourceMappingURL=all.js.map