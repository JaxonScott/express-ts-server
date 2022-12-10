import express, { Express, Response, Request, NextFunction } from "express";
import session from "express-session";
import dbConnect from "./config/db";
import "dotenv/config";
//middleware
import cors from "cors";
import authCheck from "./middleware/authCheck";
//routes
import postRoute from "./routes/posts";
import productsRoute from "./routes/products";
import authRoute from "./routes/auth";

const port = process.env.PORT || 5000;
const app = express();

dbConnect();

app.get("/", (req: Request, res: Response) => {
  res.send("This is the main route");
});

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "KASD0KAMSD1MKE2KDASDDWMQN2KLMSAKLD209IMKL",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/auth", authRoute);
app.use(authCheck);
app.use("/api/posts", postRoute);
app.use("/api/products", productsRoute);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
