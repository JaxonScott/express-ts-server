import { stat } from "fs";
import { Schema, model } from "mongoose";

enum status {
  start = "Started",
  progress = "In progress",
  completed = "completed",
}

interface IPost {
  title: string;
  body: string;
  author: string;
  status: status;
  createdAt: number;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    status: {
      type: String,
      default: status.start,
      enum: Object.values(status),
    },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", PostSchema);
export default Post;
