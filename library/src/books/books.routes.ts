import express, { type Request, type Response } from "express";
import http from "http";

const router = express.Router();

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  http.get(`http://localhost:3000/api/books/${id}`, (apiRes: http.IncomingMessage) => {
    if (apiRes.statusCode !== 200) {
      throw new Error("Request error");
    }

    apiRes.setEncoding("utf-8");
    let rawData = "";
    apiRes.on("data", (chunk: string) => {
      rawData += chunk;
    });
    apiRes.on("end", () => {
      const { book } = JSON.parse(rawData);
      const request = http.request({
        hostname: process.env.COUNTER_URL,
        port: 3001,
        path: `/counter/${req.params.id}/incr`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }, (apiRes: http.IncomingMessage) => {
        let data = "";
        apiRes.on("data", (chunk: string) => {
          data += chunk;
        });
        apiRes.on("end", () => {
          console.log(`Book ${book.title} has been viewed ${data} times`);
          res.render("../views/books/view", {
            book,
            viewsCount: data,
            title: "Книги",
            user: req.user,
          });
        });
      }).on("error", (e: Error) => {
        console.error(e);
      });
  
      request.end();
    });
  }).on("error", (e: Error) => {
    console.log(e);
  });
});

router.get("/book/update/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  http.get(`http://localhost:3000/api/books/${id}`, (apiRes: http.IncomingMessage) => {
    if (apiRes.statusCode !== 200) {
      throw new Error("Request error");
    }

    apiRes.setEncoding("utf-8");
    let rawData = "";
    apiRes.on("data", (chunk: string) => {
      rawData += chunk;
    });
    apiRes.on("end", () => {
      const parsedData = JSON.parse(rawData);
      res.render("../views/books/update", {
        book: parsedData.book,
        title: "Книги",
        user: req.user,
      });
    });
  }).on("error", (e: Error) => {
    console.log(e);
  });
});

router.get("/book/add", (req: Request, res: Response) => {
  res.render("../views/books/create", { user: req.user });
});

export default router;