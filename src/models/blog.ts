import { Schema, Document } from "mongoose";

import mongoose from "mongoose";
import { CommentD } from "./comment";

export interface Iblog extends Document {
  title: string;
  like: number;
  template: string;
  comments: CommentD[];
  image_src: string;
  small_description: string;
}

const schema: Schema = new mongoose.Schema({
  title: String,
  like: Number,
  template: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
  image_src: String,
  small_description: String,
});

// module.exports = mongoose.model("blog", schema);
// const;

const Blog = mongoose.model<Iblog>("blog", schema);
export default Blog;
