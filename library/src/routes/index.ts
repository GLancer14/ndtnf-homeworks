const express = require("express");
const http = require("http");
const router = express.Router();

router.get("/", (req: any, res: any) => {
  http.get("http://localhost:3000/api/books", (apiRes: any) => {
    if (apiRes.statusCode !== 200) {
      throw new Error("Network error");
    }

    apiRes.setEncoding("utf-8");
    let rawData = "";
    apiRes.on("data", (chunk: any) => {
      rawData += chunk;
    });
    apiRes.on("end", () => {
      const parsedData = JSON.parse(rawData);
      res.render("../views/index", {
        books: parsedData,
        title: "Книги",
        user: req.user,
      });
    });
  }).on("error", (e: any) => {
    console.log(e);
  });
});

module.exports = router;