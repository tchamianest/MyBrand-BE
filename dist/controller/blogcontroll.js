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
const validation_1 = require("../validation/validation");
// import uploads from "../cloudinary/multer";
const cloudinary_1 = __importDefault(require("../cloudinary/cloudinary"));
const multer_1 = __importDefault(require("../cloudinary/multer"));
const upload = multer_1.default;
const Postblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        upload.single("image")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log(req.body);
            // console.log(req.file);
            try {
                const blogChecker = (0, validation_1.Validateblogtopost)(req.body);
                if (blogChecker.error) {
                    return res.status(400).json({
                        status: "Fail",
                        messgae: "check your input data",
                        AT: blogChecker.error.message,
                    });
                }
                if (err) {
                    return res
                        .status(400)
                        .json({ status: "Fail", error: "Error uploading the file" });
                }
                if (!req.file)
                    return res.status(404).send("no req file");
                console.log(req.file.path);
                const result = yield cloudinary_1.default.uploader.upload(req.file.path);
                let imageUrl = "";
                imageUrl = result.url;
                // console.log(result);
                const blog = new blog_1.default({
                    title: req.body.title,
                    like: req.body.like,
                    template: req.body.template,
                    small_description: req.body.small_description,
                    image_src: imageUrl,
                });
                yield blog.save();
                return res.status(201).json({
                    status: "success!",
                    message: "blog created succeful",
                    blogs: blog,
                });
            }
            catch (error) {
                // console.log(error);
                return res.status(500).json({
                    status: "Fail",
                    message: "some error happen ",
                    errors: error,
                });
            }
        }));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: "Fail", message: "some error happen", error: error });
    }
});
exports.Postblog = Postblog;
const Getallblogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.find();
        res.status(200).json({
            status: "success",
            counntingAll: blogs.length,
            message: "getting all blog successful",
            Blogs: blogs,
        });
    }
    catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "getting all blog Fail",
            Error: err,
        });
    }
});
exports.Getallblogs = Getallblogs;
//// get singleblogs
const GetSingleblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.findOne({ _id: req.params.id }).populate("comments");
        if (!blogs) {
            return res
                .status(404)
                .json({ status: "fail", error: "error the blog not exist" });
        }
        res.status(200).json({
            status: "success",
            message: "isok we get single blog",
            blogs: blogs,
        });
    }
    catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "there is an error  in geting single blog",
            error: err,
        });
    }
});
exports.GetSingleblog = GetSingleblog;
/////DELETE BLOGS
const Deleteblogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blog_1.default.deleteOne({ _id: req.params.id });
        res
            .status(204)
            .json({ status: "success", message: "blog deleted succesufl" });
    }
    catch (err) {
        res.status(404).json({
            status: "Fail",
            message: "the blog are not deleted there is error happrn",
            error: err,
        });
    }
});
exports.Deleteblogs = Deleteblogs;
/////UPDATE SINGLE BLOGS
const Updateblog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.findOne({ _id: req.params.id });
        if (!blogs) {
            res.status(404).json({ status: "fail", error: "blog doesn't exist!" });
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
        res.status(200).json({
            status: "success!",
            message: "blog updated succeful",
            Blog: blogs,
        });
    }
    catch (err) {
        res.status(404);
        res.json({
            status: "Fail",
            message: "the blog are not updated",
            error: err,
        });
    }
});
exports.Updateblog = Updateblog;
// export { postblog, getallblogs, getSingleblog, Deleteblogs, Updateblog };
