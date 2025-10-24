import { type Request, type Response } from "express";

export default (req: Request, res: Response) => {
  res.status(404);
  res.render("errors/404", { user: req.user || null });
};