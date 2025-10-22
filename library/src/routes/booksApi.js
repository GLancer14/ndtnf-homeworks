const express = require("express");
const fs = require("fs");
const fileMulter = require("../middleware/file");
const container = require("../container");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const repo = container.get(BookRepository);
    const books = await repo.getBooks();
    res.json(books);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.post("/", fileMulter.single("book"), async (req, res) => {
  const repo = container.get(BookRepository);
  try {
    await repo.createBook({
      ...req.body,
      favorite: req.body.favorite ? true : false,
      fileBook: req.file ? req.file.filename : "",
    });

    res.status(201);
    res.redirect("/");
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  const repo = container.get(BookRepository);
  try {
    const book = await repo.getBook(req.params.id);
    if (book) {
      res.json({ book });
    } else {
      res.status(404);
      res.redirect("/404");
    }
  } catch(e) {
    res.status(500).json(e);
  }
});

router.put("/:id", fileMulter.single("book"), async (req, res) => {
  const repo = container.get(BookRepository);
  try {
    const book = await repo.updateBook(req.params.id, {
      ...req.body,
      favorite: req.body.favorite ? true : false,
      fileBook: req.file ? req.file.filename : req.body.fileBook,
    });

    if (book) {
      if (book.fileBook !== "" && req.file) {
        fs.rm(__dirname + `/../public/books/${book.fileBook}`, err => {
          if (err) {
            throw err;
          }
        });
      }

      res.redirect("/");
    } else {
      res.status(404);
      res.redirect("/404");
    }
  } catch(e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  const repo = container.get(BookRepository);
  try {
    const book = await repo.getBook(req.params.id);
    if (book) {
      if (book.fileBook !== "") {
        fs.rm(__dirname + `/../public/books/${book.fileBook}`, err => {
          if (err) {
            throw err;
          }
        });
      }

      await repo.deleteBook(req.params.id);
      res.redirect("/");
    } else {
      res.status(404);
      res.redirect("/404");
    }
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get("/:id/download", async (req, res) => {
  const repo = container.get(BookRepository);
  try {
    const book = await repo.getBook(req.params.id);
    if (book) {
      res.download(__dirname + `/../public/books/${book.fileBook}`, err => {
        if (err) {
          res.status(404);
          res.redirect("/404");
        }
      });
    } else {
      res.status(404);
      res.redirect("/404");
    }
  } catch(e) {
    res.status(500).json(e);
  }
});

module.exports = router;
