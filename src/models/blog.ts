import mongoose from "mongoose";
import { CommentD } from "./comment";

export interface Iblog {
  title: string;
  like: number;
  template: string;
  comments: CommentD[];
  image: any;
  image_src: string;
  small_description: string;
}

const schema = new mongoose.Schema<Iblog>({
  title: String,
  like: Number,
  template: String,
  comments: [],
  image_src: String,
  small_description: String,
});

// module.exports = mongoose.model("blog", schema);
// const;

const Blog = mongoose.model<Iblog>("blog", schema);
export default Blog;
