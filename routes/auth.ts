import { Router, Request, Response } from "express";

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
