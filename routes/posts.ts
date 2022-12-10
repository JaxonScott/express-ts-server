import { Router, Request, Response } from "express";
import Post from "../models/Post";

const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const posts = await Post.find();
  return res.send(posts);
});

route.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    return res.send(post);
  } catch (err) {
    res.send("Unable to find post with this id");
  }
});

route.post("/", async (req: Request, res: Response) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    status: req.body.status,
  });
  await post.save();
  return res.send(post);
});

route.delete("/:id", async (req: Request, res: Response) => {
  const post = await Post.findById({ _id: req.params.id });
  if (!post) {
    res.send("Unable to find post with this id");
  } else {
    await Post.findByIdAndDelete({ _id: req.params.id });
    res.send("Post deleted! 🗑");
  }
});

route.patch("/:id", async (req: Request, res: Response) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          body: req.body.body,
          author: req.body.author,
          status: req.body.status,
        },
      },
      { new: true }
    );
    res.send(updatePost);
  } catch (err) {
    res.send("unable to update post");
  }
});

export default route;
