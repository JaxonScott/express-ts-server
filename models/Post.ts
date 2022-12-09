import { Schema, model } from "mongoose";

interface IPost {
  title: string;
  body: string;
  author: string;
  createdAt: number;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", PostSchema);
export default Post;
