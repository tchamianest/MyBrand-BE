"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messagereply = exports.SameblogCher = exports.Isblogexist = void 0;
const blog_1 = __importDefault(require("../models/blog"));
const Querys_1 = __importDefault(require("../models/Querys"));
const Isblogexist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        // console.log(blogId);
        const blog = yield blog_1.default.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).send({ error: "blog Post Not Found" });
        }
        else {
            next();
        }
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});
exports.Isblogexist = Isblogexist;
const SameblogCher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.body.title;
        console.log(blogId);
        const blog = yield blog_1.default.findOne({ title: blogId });
        console.log(blog);
        if (!blog) {
            next();
        }
        else {
            return res
                .status(404)
                .send({ error: "there athor same blog please change the data" });
        }
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});
exports.SameblogCher = SameblogCher;
const Messagereply = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield Querys_1.default.findOne({ _id: req.params.id });
        if (!message) {
            return res
                .status(404)
                .send({ error: "these message are no longer Exist !" });
        }
        else {
            next();
        }
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
});
exports.Messagereply = Messagereply;
