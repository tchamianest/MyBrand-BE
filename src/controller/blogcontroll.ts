import { Request, Response } from "express";
import Blog, { Iblog } from "../models/blog";

export const Postblog = async (req: Request, res: Response) => {
  try {
    const blog: Iblog = new Blog({
      title: req.body.title,
      like: req.body.like,
      template: req.body.template,
      image_src: req.body.image_src,
      small_description: req.body.small_description,
    });
    await blog.save();
    res.send(blog);
  } catch (error) {
    console.log(error);
  }
};

export const Getallblogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  console.log(blogs);
  res.send(blogs);
};

//// get singleblogs
export const GetSingleblog = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findOne({ _id: req.params.id });
    res.send(blogs);
  } catch {
    res.status(404);
    res.send({ error: "Post dosen't exist !" });
  }
};

/////DELETE BLOGS
export const Deleteblogs = async (req: Request, res: Response) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};
/////UPDATE SINGLE BLOGS
export const Updateblog = async (req: Request, res: Response) => {
  try {
    const blogs = (await Blog.findOne({ _id: req.params.id })) as Iblog | null;

    if (!blogs) {
      res.status(404).send({ error: "Post doesn't exist!" });
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

    await blogs.save();
    res.send(blogs);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

// export { postblog, getallblogs, getSingleblog, Deleteblogs, Updateblog };
