"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    title: String,
    like: Number,
    template: String,
    image_src: String,
    small_description: String,
});
// module.exports = mongoose.model("blog", schema);
// const;
const Blog = mongoose_1.default.model("blog", schema);
exports.default = Blog;
