"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const commentsSchema = new mongoose_1.Schema({
    names: String,
    comment: String,
});
const Comments = mongoose_2.default.model("comments", commentsSchema);
exports.default = Comments;
