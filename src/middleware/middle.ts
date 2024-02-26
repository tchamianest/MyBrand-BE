import { Request, Response, NextFunction } from "express";
import Blog, { Iblog } from "../models/blog";
import Message from "../models/Querys";
import supertest from "supertest";
import express from "express";

export const Isblogexist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = req.params.id;
    // console.log(blogId);
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      return res.status(404).send({ error: "blog Post Not Found" });
    } else {
      next();
    }
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};
export const SameblogCher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = req.body.title;
    console.log(blogId);
    const blog = await Blog.findOne({ title: blogId });
    console.log(blog);
    if (!blog) {
      next();
    } else {
      return res
        .status(404)
        .send({ error: "there athor same blog please change the data" });
    }
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

export const Messagereply = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await Message.findOne({ _id: req.params.id });

    if (!message) {
      return res
        .status(404)
        .send({ error: "these message are no longer Exist !" });
    } else {
      next();
    }
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};
