import { Schema, Document } from "mongoose";

import mongoose from "mongoose";

export interface Iblog extends Document {
  title: string;
  like: number;
  template: string;
  image_src: string;
  small_description: string;
}

const schema: Schema = new mongoose.Schema({
  title: String,
  like: Number,
  template: String,
  image_src: String,
  small_description: String,
});

// module.exports = mongoose.model("blog", schema);
// const;

const Blog = mongoose.model<Iblog>("blog", schema);
export default Blog;
