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
exports.Updateblog = exports.Deleteblogs = exports.GetSingleblog = exports.Getallblogs = exports.Postblog = void 0;
const blog_1 = __importDefault(require("../models/blog"));
const Postblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = new blog_1.default({
            title: req.body.title,
            like: req.body.like,
            template: req.body.template,
            image_src: req.body.image_src,
            small_description: req.body.small_description,
        });
        yield blog.save();
        res.send(blog);
    }
    catch (error) {
        console.log(error);
    }
});
exports.Postblog = Postblog;
const Getallblogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_1.default.find();
    console.log(blogs);
    res.send(blogs);
});
exports.Getallblogs = Getallblogs;
//// get singleblogs
const GetSingleblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.findOne({ _id: req.params.id });
        res.send(blogs);
    }
    catch (_a) {
        res.status(404);
        res.send({ error: "Post dosen't exist !" });
    }
});
exports.GetSingleblog = GetSingleblog;
/////DELETE BLOGS
const Deleteblogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blog_1.default.deleteOne({ _id: req.params.id });
        res.status(204).send();
    }
    catch (_b) {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
exports.Deleteblogs = Deleteblogs;
/////UPDATE SINGLE BLOGS
const Updateblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = (yield blog_1.default.findOne({ _id: req.params.id }));
        if (!blogs) {
            res.status(404).send({ error: "Post doesn't exist!" });
            return;
        }
        if (req.body.title) {
            blogs.title = req.body.title;
        }
        if (req.body.like) {
            blogs.like = req.body.like;
        }
        if (req.body.template) {
            blogs.template = req.body.template;
        }
        if (req.body.image_src) {
            blogs.image_src = req.body.image_src;
        }
        if (req.body.small_description) {
            blogs.small_description = req.body.small_description;
        }
        yield blogs.save();
        res.send(blogs);
    }
    catch (_c) {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
exports.Updateblog = Updateblog;
// export { postblog, getallblogs, getSingleblog, Deleteblogs, Updateblog };
