import express, { Express, Response, Request } from "express";
import dbConnect from "./config/db";
import postRoute from "./routes/posts";
import "dotenv/config";

const port = process.env.PORT || 5000;
const app = express();

dbConnect();

app.get("/", (req: Request, res: Response) => {
  res.send("This is the main route");
});

app.use(express.json());
app.use("/api/posts", postRoute);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
