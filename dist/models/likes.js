"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Likeschema = new mongoose_1.default.Schema({
    blog_id: String,
    like: Boolean,
});
const Likes = mongoose_1.default.model("Likes", Likeschema);
exports.default = Likes;
