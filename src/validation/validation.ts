import Joi, { any, string } from "joi";
import { Imessages } from "../models/Querys";
import { Iblog } from "../models/blog";
import { CommentD } from "../models/comment";

export const Validateblogtopost = (blogs: Iblog) => {
  const BlogcreateSchema = Joi.object<Iblog>({
    title: Joi.string().min(10),
    like: Joi.number(),
    template: Joi.string().min(4),
    comments: Joi.any(),
    small_description: Joi.string().min(9),
  });

  return BlogcreateSchema.validate(blogs);
};

//////VALIDATE TEH MESSAGE BEFORE SEND IT TO THE DATABASE
export const Messagevalidation = (message: Imessages) => {
  ///NEW SHEMA FOR VALIDAATION

  const messageSchema = Joi.object({
    email: Joi.string().email(),
    messages: Joi.string().min(10).required(),
    reply: Joi.string(),
  });
  return messageSchema.validate(message);
};

export const commentsvalidation = (comments: CommentD) => {
  const commentsScheam = Joi.object({
    name: Joi.string().min(6).required(),
    comment: Joi.string().min(10).required(),
  });
  return commentsScheam.validate(comments);
};
