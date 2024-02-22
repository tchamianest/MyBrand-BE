import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface CommentD extends Document {
  blog_id: string;
  names: string;
  comment: string;
}

const commentsSchema = new mongoose.Schema({
  blog_id: String,
  names: String,
  comment: String,
});

const Comments = mongoose.model<CommentD>("comments", commentsSchema);
export default Comments;
