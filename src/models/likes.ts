import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface Likeid extends Document {
  blog_id: string;
  like: boolean;
}

const Likeschema = new mongoose.Schema({
  blog_id: String,
  like: Boolean,
});

const Likes = mongoose.model<Likeid>("Likes", Likeschema);
export default Likes;
