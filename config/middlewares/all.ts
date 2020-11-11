import { IRequest, IResponse, NextFn } from "@appolo/route";
import {  App } from "@appolo/core";
import bodyParser = require("body-parser");
import    serve = require("serve-static");
import    path = require("path");
import    cors = require("cors");

module.exports = function(app: App) {
  app.route.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cors())
    .use(serve(path.join(__dirname, "../../public")));

};
