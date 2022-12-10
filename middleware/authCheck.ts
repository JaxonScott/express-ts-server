import { Router, NextFunction, Request, Response } from "express";

const route = Router();

route.use((req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) next();
  else {
    res.sendStatus(401);
  }
});

export default route;
