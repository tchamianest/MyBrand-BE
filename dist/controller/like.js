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
exports.GetLikestoblog = exports.RemoveLike = exports.Putlikes = exports.GetallLikes = void 0;
const likes_1 = __importDefault(require("../models/likes"));
const blog_1 = __importDefault(require("../models/blog"));
const GetallLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Alllikes = yield likes_1.default.find();
        res.status(200).send(Alllikes);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});
exports.GetallLikes = GetallLikes;
const Putlikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const blog = yield blog_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).send({ error: "the blogs are not exist" });
        }
        const like = new likes_1.default({
            blog_id: blogId,
            like: req.body.like,
        });
        yield like.save();
        res.status(201).send(like);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});
exports.Putlikes = Putlikes;
const RemoveLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likeid = req.params.id;
        const onelike = yield likes_1.default.findById(likeid);
        if (!onelike) {
            return res.status(404).send({ error: "comments Post Not Found" });
        }
        yield likes_1.default.deleteOne({ _id: likeid });
        res.status(200).send({ message: "Comment deleted successfully" });
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});
exports.RemoveLike = RemoveLike;
const GetLikestoblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const likes = yield likes_1.default.find({ blog_id: blogId });
        res.status(200).send(likes);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal server error" });
    }
});
exports.GetLikestoblog = GetLikestoblog;
