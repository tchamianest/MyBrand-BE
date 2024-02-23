import Likes, { Likeid } from "../models/likes";
import { Request, Response } from "express";
import Blog from "../models/blog";

export const GetallLikes = async (req: Request, res: Response) => {
  try {
    const Alllikes = await Likes.find();
    res.status(200).send(Alllikes);
  } catch (error: any) {
    res.status(404).send(error.message);
  }
};

export const Putlikes = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send({ error: "the blogs are not exist" });
    }

    const like: Likeid = new Likes({
      blog_id: blogId,
      like: req.body.like,
    });
    await like.save();
    res.status(201).send(like);
  } catch (error: any) {
    res.status(404).send(error.message);
  }
};

export const RemoveLike = async (req: Request, res: Response) => {
  try {
    const likeid = req.params.id;
    const onelike = await Likes.findById(likeid);

    if (!onelike) {
      return res.status(404).send({ error: "comments Post Not Found" });
    }
    await Likes.deleteOne({ _id: likeid });
    res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error: any) {
    res.status(404).send(error.message);
  }
};

export const GetLikestoblog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const likes = await Likes.find({ blog_id: blogId });
    res.status(200).send(likes);
  } catch (error) {
    res.status(404).send({ error: "Internal server error" });
  }
};
