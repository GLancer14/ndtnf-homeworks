import express, { type Request, type Response } from "express";
import http from "http";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  http.get("http://localhost:3000/api/books", (apiRes: http.IncomingMessage) => {
    if (apiRes.statusCode !== 200) {
      throw new Error("Network error");
    }

    apiRes.setEncoding("utf-8");
    let rawData = "";
    apiRes.on("data", (chunk: string) => {
      rawData += chunk;
    });
    apiRes.on("end", () => {
      const parsedData = JSON.parse(rawData);
      res.render("../src/views/index", {
        books: parsedData,
        title: "Книги",
        user: req.user,
      });
    });
  }).on("error", (e) => {
    console.log(e);
  });
});

export default router;