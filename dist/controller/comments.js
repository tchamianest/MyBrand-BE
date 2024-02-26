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
exports.Getcommentstoblog = exports.UpdateComment = exports.Postcomments = exports.Deletcomments = exports.Singlecomments = exports.Getallcomments = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const blog_1 = __importDefault(require("../models/blog"));
const validation_1 = require("../validation/validation");
/////ACESS ALL COMMENTS
const Getallcomments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Allcoments = yield comment_1.default.find();
        res.status(200).json({ ststus: "Success", Comments: Allcoments });
    }
    catch (error) {
        res.json({ status: "Fail", Error: error.message });
    }
});
exports.Getallcomments = Getallcomments;
//////ACCESS SINGLECOMNTS
const Singlecomments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentid = req.params.id;
        const comment = yield comment_1.default.findById(commentid);
        if (!comment) {
            return res.status(404).json({ error: "comments Post Not Found" });
        }
        res.status(200).send(comment);
    }
    catch (error) {
        res.json({ status: "Fail", Error: error.message });
    }
});
exports.Singlecomments = Singlecomments;
////DELETE THE COMMENTS
const Deletcomments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentid = req.params.id;
        const comment = yield comment_1.default.findById(commentid);
        if (!comment) {
            return res.status(404).json({ error: "comments Post Not Found" });
        }
        yield comment_1.default.deleteOne({ _id: commentid });
        res
            .status(200)
            .json({ status: "success", message: "Comment deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ status: "Fail", Error: error.message });
    }
});
exports.Deletcomments = Deletcomments;
const Postcomments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentscheker = (0, validation_1.commentsvalidation)(req.body);
        if (commentscheker.error) {
            return res
                .status(400)
                .json({ status: "Fail", Error: commentscheker.error.message });
        }
        const blogId = req.params.id;
        const blog = yield blog_1.default.findById(blogId);
        if (!blog) {
            return res
                .status(404)
                .json({ ststus: "Fail", message: "blog Post Not Found" });
        }
        // const commenta: CommentD = new Comments({
        //   names: req.body.name,
        //   comment: req.body.comment,
        // });
        // await commenta.save();
        const commenta = new comment_1.default({
            blog_id: req.params.id,
            names: req.body.name,
            comment: req.body.comment,
        });
        yield commenta.save();
        res.status(201).json({ status: "Success", Comment: commenta });
    }
    catch (error) {
        console.log(error);
    }
});
exports.Postcomments = Postcomments;
////UPDATE COMMENTS
const UpdateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.params.id;
        const comment = yield comment_1.default.findOne({ _id: commentId });
        if (!comment) {
            return res
                .status(404)
                .json({ status: "fail", message: "Comment not found!" });
        }
        if (req.body.comment) {
            comment.comment = req.body.comment;
        }
        yield comment.save();
        res.status(200).json({ status: "Success", UpdatedComments: comment });
    }
    catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "Error saving the comment!",
            Error: error,
        });
    }
});
exports.UpdateComment = UpdateComment;
const Getcommentstoblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const comments = yield comment_1.default.find({ blog_id: blogId });
        res
            .status(200)
            .json({ status: "success", Allsingleblogcomments: comments });
    }
    catch (error) {
        res
            .status(500)
            .json({ status: "Fail", message: "Internal server error", Error: error });
    }
});
exports.Getcommentstoblog = Getcommentstoblog;
