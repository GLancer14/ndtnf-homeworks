const express = require("express");
const passport = require("passport");
const router = express.Router();
const Users = require("../models/users");
const authStrategy = require("../middleware/strategy");
const isAuth = require("../middleware/isAuth");

passport.use("local", authStrategy);

passport.serializeUser((user: any, cb: any) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id: any, cb: any) => {
  try {
    const user = await Users.findById(id);
    cb(null, user);
  } catch(e) {
    cb(e);
  }
});

router.get("/login", (req: any, res: any) => {
  res.render("../views/auth/login", { user: req.user });
});

router.get("/signup", (req: any, res: any) => {
  res.render("../views/auth/signup", { user: null });
});

router.get("/logout", (req: any, res: any) => {
  req.logout((err: any) => {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

router.get("/me", isAuth, (req: any, res: any) => {
  res.render("../views/user/profile", { user: req.user });
});

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/api/user/login",
  successRedirect: "/",
}));

router.post("/signup", async (req: any, res: any, next: any) => {
  const newUser = new Users({ ...req.body });
  try {
    await newUser.save();

    next();
  } catch(e) {
    res.status(500).json(e);
  }
}, passport.authenticate("local", {
  failureRedirect: "/api/user/login",
  successRedirect: "/",
}));

module.exports = router;