import Comments, { CommentD } from "../models/comment";
import { Request, Response } from "express";
import Blog, { Iblog } from "../models/blog";
import { commentsvalidation } from "../validation/validation";

/////ACESS ALL COMMENTS
export const Getallcomments = async (req: Request, res: Response) => {
  try {
    const Allcoments = await Comments.find();
    res.status(200).send(Allcoments);
  } catch (error: any) {
    res.send(error.message);
  }
};

//////ACCESS SINGLECOMNTS
export const Singlecomments = async (req: Request, res: Response) => {
  try {
    const commentid = req.params.id;
    const comment = await Comments.findById(commentid);

    if (!comment) {
      return res.status(404).send({ error: "comments Post Not Found" });
    }
    res.status(200).send(comment);
  } catch (error: any) {
    res.send(error.message);
  }
};

////DELETE THE COMMENTS
export const Deletcomments = async (req: Request, res: Response) => {
  try {
    const commentid = req.params.id;
    const comment = await Comments.findById(commentid);

    if (!comment) {
      return res.status(404).send({ error: "comments Post Not Found" });
    }
    await Comments.deleteOne({ _id: commentid });
    res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error: any) {
    res.status(404).send(error.message);
  }
};

export const Postcomments = async (req: Request, res: Response) => {
  try {
    const commentscheker = commentsvalidation(req.body);
    if (commentscheker.error) {
      return res.status(400).send(commentscheker.error.message);
    }
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send({ error: "blog Post Not Found" });
    }

    // const commenta: CommentD = new Comments({
    //   names: req.body.name,
    //   comment: req.body.comment,
    // });
    // await commenta.save();

    const commenta: CommentD = new Comments({
      blog_id: req.params.id,
      names: req.body.name,
      comment: req.body.comment,
    });
    await commenta.save();
    res.status(201).send(commenta);
  } catch (error) {
    console.log(error);
  }
};

////UPDATE COMMENTS
export const UpdateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await Comments.findById(commentId);

    if (!comment) {
      return res.status(404).send({ error: "Blog post not found!" });
    }

    if (req.body.names) {
      comment.names = req.body.name;
    }

    if (req.body.comment) {
      comment.comment = req.body.comment;
    }

    await comment.save();
    res.status(200).send(comment);
  } catch (error) {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

export const Getcommentstoblog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const comments = await Comments.find({ blog_id: blogId });
    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};
