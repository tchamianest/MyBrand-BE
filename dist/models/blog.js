"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const schema = new mongoose_2.default.Schema({
    title: String,
    like: Number,
    template: String,
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "comments" }],
    image_src: String,
    small_description: String,
});
// module.exports = mongoose.model("blog", schema);
// const;
const Blog = mongoose_2.default.model("blog", schema);
exports.default = Blog;
