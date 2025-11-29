const express = require("express");
const passport = require("passport");
const router = express.Router();
const YandexStartegy = require("passport-yandex").Strategy;
const isAuth = require("../middleware/isAuth");
const dotenv = require("dotenv");

dotenv.config()

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

passport.use(
  new YandexStartegy({
    clientID: process.env.YANDEX_CLIENT_ID,
    clientSecret: process.env.YANDEX_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/yandex/callback",
  },
  (accToken, refToken, profile, cb) => {
    process.nextTick(() => {
      return cb(null, profile);
    });
  }
));

router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      throw err;
    }
  });
  res.redirect("/");
});

router.get("/profile", isAuth, (req, res) => {
  res.render("../views/user/profile", { user: req.user });
});

router.get("/login", passport.authenticate("yandex"));

router.get("/yandex/callback",
  passport.authenticate("yandex", {
    failureRedirect: "/",
    successRedirect: "/profile",
  })
);

module.exports = router;