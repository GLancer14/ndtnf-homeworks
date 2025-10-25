import express, { type Request, type Response, type NextFunction } from "express";
import passport from "passport";
import authStrategy from "../middleware/strategy.js";
import isAuth from "../middleware/isAuth.js";
import { container } from "../infrastructure/container.js";
import { UsersService } from "./users.service.js";
import type { UserSerializationCB } from "./user.js";

const router = express.Router();

passport.use("local", authStrategy);

passport.serializeUser((user: Express.User & { id?: string }, cb: UserSerializationCB) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id: string, cb: UserSerializationCB) => {
  const repo = container.get(UsersService);
  try {
    const user = await repo.findUserById(id);
    cb(null, user);
  } catch(e: unknown) {
    if (e instanceof Error) {
      cb(e);
    } else {
      cb({ name: "Unknown error", message: "Unknown error" });
    }
  }
});

router.get("/login", (req: Request, res: Response) => {
  res.render("../views/auth/login", { user: req.user });
});

router.get("/signup", (req: Request, res: Response) => {
  res.render("../views/auth/signup", { user: null });
});

router.get("/logout", (req: Request, res: Response) => {
  req.logout((err: Error) => {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

router.get("/me", isAuth, (req: Request, res: Response) => {
  res.render("../views/user/profile", { user: req.user });
});

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/api/user/login",
  successRedirect: "/",
}));

router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  const repo = container.get(UsersService);
  try {
    await repo.createUser({ ...req.body });
    next();
  } catch(e) {
    res.status(500).json(e);
  }
}, passport.authenticate("local", {
  failureRedirect: "/api/user/login",
  successRedirect: "/",
}));

export default router;