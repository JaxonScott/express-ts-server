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

route.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  //if no username or password passed return 400
  if (!username || !password) return res.sendStatus(400);
  //find user by username in db
  const userDB = await User.findOne({ username });
  //if no user found with that username return 401
  if (!userDB) return res.sendStatus(401);
  //if found compare the raw to hashed password
  const isValid = comparePassword(password, userDB.password);
  if (isValid) {
    console.log("Authenticated successfully 👍");
    req.session.user = userDB;
    return res.sendStatus(200);
  } else {
    console.log("authentication failed 👎");
    return res.sendStatus(401);
  }
});

export default route;
