const express = require("express");
const http = require("http");
const router = express.Router();

router.get("/:id", (req: any, res: any) => {
  const { id } = req.params;

  http.get(`http://localhost:3000/api/books/${id}`, (apiRes: any) => {
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
      }, (apiRes: any) => {
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
      }).on("error", (e: any) => {
        console.error(e);
      });
  
      request.end();
    });
  }).on("error", (e: any) => {
    console.log(e);
  });
});

router.get("/book/update/:id", (req: any, res: any) => {
  const { id } = req.params;

  http.get(`http://localhost:3000/api/books/${id}`, (apiRes: any) => {
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
  }).on("error", (e: any) => {
    console.log(e);
  });
});

router.get("/book/add", (req: any, res: any) => {
  res.render("../views/books/create", { user: req.user });
});

module.exports = router;