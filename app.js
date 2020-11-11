"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@appolo/core");
(async () => {
    try {
        await core_1.createApp().launch();
    }
    catch (e) {
        console.error("failed to launch ", e.stack);
        process.exit(1);
    }
})();
//# sourceMappingURL=app.js.map