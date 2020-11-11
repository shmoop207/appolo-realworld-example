import {IEnv} from "../env/IEnv";
import {App} from "@appolo/core";
import {TypeOrmModule} from "@appolo/typeorm";
import {ViewModule, ViewEngines} from "@appolo/view";
import {ValidationModule} from "@appolo/validator";
import {LoggerModule} from "@appolo/logger";

export = async function (app: App, env: IEnv) {
    await app.module.load(LoggerModule);

     app.module.use(
        ViewModule.for({viewEngine: ViewEngines.ejs}),
        ValidationModule,
        TypeOrmModule.for({
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
        }))
}
