import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface CommentD extends Document {
  names: string;
  comment: string;
}

const commentsSchema: Schema = new Schema({
  names: String,
  comment: String,
});

const Comments = mongoose.model<CommentD>("comments", commentsSchema);
export default Comments;
