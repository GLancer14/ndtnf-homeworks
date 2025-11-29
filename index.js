const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const error404 = require("./middleware/404");

dotenv.config();

const app = express();
app.use(require("cookie-parser")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/", userRoutes);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on a port ${PORT}`));