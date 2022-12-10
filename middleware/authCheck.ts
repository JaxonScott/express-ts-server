import { Router, NextFunction, Request, Response } from "express";

const route = Router();

route.use((req: Request, res: Response, next: NextFunction) => {
  console.log("inside authCheck middleware");
  if (req.user) next();
  else {
    res.sendStatus(401);
  }
});

export default route;
