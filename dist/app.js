"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const router_1 = __importDefault(require("./models/router"));
require("./jwt/authe");
const app = (0, express_1.default)();
app.use(express_1.default.json());
passport_1.default.initialize();
app.use("/api", router_1.default);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/user", passport_1.default.authenticate("jwt", { session: false }), router_1.default);
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});
exports.default = app;
