import { type NextFunction, type Request, type Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/api/user/login");
  }

  next();
};