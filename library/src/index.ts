import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import methodOverride from "method-override";
// import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import http from "http";
import indexRoutes from "./index/index.routes.js";
import booksRoutes from "./books/books.routes.js";
import userRoutes from "./users/users.routes.js";
import booksApiRoutes from "./booksApi/booksApi.routes.js";
import error404 from "./middleware/404.js";
import createSocketIO from "./websocket/websocket.js";

dotenv.config();

const app = express();
const server = new http.Server(app);
createSocketIO(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/books", booksRoutes);
app.use("/api/user", userRoutes);
app.use("/api/books", booksApiRoutes);
app.use(error404);

async function start(PORT: string | number, DBURL: string) {
  try {
    await mongoose.connect(DBURL);
    server.listen(PORT, () => console.log(`App is listening on a port ${PORT}`));
  } catch(e) {
    console.log(e)
  }
}

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;
start(PORT, DBURL)