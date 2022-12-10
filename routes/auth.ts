import { Router, Request, Response } from "express";
import { hashPassword, comparePassword } from "../utils/helpers";
import User from "../models/User";
const route = Router();

//creating and exporting the type user for express-session types
declare module "express-session" {
  export interface SessionData {
    user: { username: string; password?: string };
  }
}

route.get("/", (req: Request, res: Response) => {
  res.send("This is the auth route 🔐");
});

route.post("/register", async (req: Request, res: Response) => {
  const { username } = req.body;
  const userDB = await User.findOne({ username });
  if (userDB) {
    res.sendStatus(400);
  } else {
    const password = hashPassword(req.body.password);
    console.log(`Password hash: ${password}`);
    const user = new User({
      username,
      password,
    });
    await user.save();
    return res.send(`new user added ${username}`);
  }
});

route.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  //check if username & password was passed
  if (username && password) {
    //check if the user already has a logged in session
    if (req.session.user) {
      res.send(req.session.user);
      //if not create a session
    } else {
      req.session.user = {
        username,
      };
      res.send(req.session);
    }
  } else {
    res.sendStatus(400);
  }
});

export default route;
