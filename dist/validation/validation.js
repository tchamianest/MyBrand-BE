"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsvalidation = exports.Messagevalidation = exports.Validateblogtopost = void 0;
const joi_1 = __importDefault(require("joi"));
const Validateblogtopost = (blogs) => {
    const BlogcreateSchema = joi_1.default.object({
        title: joi_1.default.string().min(10).required(),
        like: joi_1.default.number(),
        template: joi_1.default.string().min(4).required(),
        comments: joi_1.default.any(),
        small_description: joi_1.default.string().min(9).required(),
    });
    return BlogcreateSchema.validate(blogs);
};
exports.Validateblogtopost = Validateblogtopost;
//////VALIDATE TEH MESSAGE BEFORE SEND IT TO THE DATABASE
const Messagevalidation = (message) => {
    ///NEW SHEMA FOR VALIDAATION
    const messageSchema = joi_1.default.object({
        email: joi_1.default.string().email(),
        messages: joi_1.default.string().min(10).required(),
        reply: joi_1.default.string(),
    });
    return messageSchema.validate(message);
};
exports.Messagevalidation = Messagevalidation;
const commentsvalidation = (comments) => {
    const commentsScheam = joi_1.default.object({
        name: joi_1.default.string().min(6).required(),
        comment: joi_1.default.string().min(10).required(),
    });
    return commentsScheam.validate(comments);
};
exports.commentsvalidation = commentsvalidation;
