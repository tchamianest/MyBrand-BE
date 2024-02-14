import Comments, { CommentD } from "../models/comment";
import { Request, Response } from "express";
import Blog, { Iblog } from "../models/blog";
import { commentsvalidation } from "../validation/validation";

/////ACESS ALL COMMENTS
export const Getallcomments = async (req: Request, res: Response) => {
  try {
    const Allcoments = await Comments.find();
    res.status(200).json({ ststus: "Success", Comments: Allcoments });
  } catch (error: any) {
    res.json({ status: "Fail", Error: error.message });
  }
};

//////ACCESS SINGLECOMNTS
export const Singlecomments = async (req: Request, res: Response) => {
  try {
    const commentid = req.params.id;
    const comment = await Comments.findById(commentid);

    if (!comment) {
      return res.status(404).json({ error: "comments Post Not Found" });
    }
    res.status(200).send(comment);
  } catch (error: any) {
    res.json({ status: "Fail", Error: error.message });
  }
};

////DELETE THE COMMENTS
export const Deletcomments = async (req: Request, res: Response) => {
  try {
    const commentid = req.params.id;
    const comment = await Comments.findById(commentid);

    if (!comment) {
      return res.status(404).json({ error: "comments Post Not Found" });
    }
    await Comments.deleteOne({ _id: commentid });
    res
      .status(200)
      .json({ status: "success", message: "Comment deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ status: "Fail", Error: error.message });
  }
};

export const Postcomments = async (req: Request, res: Response) => {
  try {
    const commentscheker = commentsvalidation(req.body);
    if (commentscheker.error) {
      return res
        .status(400)
        .json({ status: "Fail", Error: commentscheker.error.message });
    }
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ ststus: "Fail", message: "blog Post Not Found" });
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
    res.status(201).json({ status: "Success", Comment: commenta });
  } catch (error) {
    console.log(error);
  }
};

////UPDATE COMMENTS
export const UpdateComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;
    const comment: any = await Comments.findOne({ _id: commentId });

    if (!comment) {
      return res
        .status(404)
        .json({ status: "fail", message: "Comment not found!" });
    }

    if (req.body.comment) {
      comment.comment = req.body.comment;
    }

    await comment.save();
    res.status(200).json({ status: "Success", UpdatedComments: comment });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Error saving the comment!",
      Error: error,
    });
  }
};

export const Getcommentstoblog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const comments = await Comments.find({ blog_id: blogId });
    res
      .status(200)
      .json({ status: "success", Allsingleblogcomments: comments });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Fail", message: "Internal server error", Error: error });
  }
};
