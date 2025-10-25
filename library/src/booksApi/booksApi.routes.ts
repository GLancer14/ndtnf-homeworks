import express, { type Request, type Response } from "express";
import fileMulter from "../middleware/file.js";
import { container } from "../infrastructure/container.js";
import { BooksService } from "./booksApi.service.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const repo = container.get(BooksService);
    const books = await repo.getBooks();
    res.json(books);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.post("/", fileMulter.single("book"), async (req: Request, res: Response) => {
  const repo = container.get(BooksService);
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

router.get("/:id", async (req: Request, res: Response) => {
  const repo = container.get(BooksService);
  try {
    const book = await repo.getBook(req.params.id);
    if (!book) {
      res.status(404);
      res.redirect("/404");
    } else {
      res.json({ book });
    }
  } catch(e) {
    res.status(500).json(e);
  }
});

router.put("/:id", fileMulter.single("book"), async (req: Request, res: Response) => {
  const repo = container.get(BooksService);
  try {
    await repo.updateBook(req.params.id, {
      ...req.body,
      favorite: req.body.favorite ? true : false,
      fileBook: req.file ? req.file.filename : req.body.fileBook,
    });

    res.redirect("/");
  } catch(e: unknown) {
    if (e instanceof Error) {
        if (e.message !== "Book doesn't found") {
        res.status(404);
        res.redirect("/404");
      } else {
        res.status(500).json(e);
      }
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const repo = container.get(BooksService);
  try {
    await repo.getBook(req.params.id);
  } catch(e: unknown) {
    if (e instanceof Error) {
        if (e.message !== "Book doesn't found") {
        res.status(404);
        res.redirect("/404");
      } else {
        res.status(500).json(e);
      }
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
});

router.get("/:id/download", async (req: Request, res: Response) => {
  const repo = container.get(BooksService);
  try {
    const book = await repo.getBook(req.params.id);
    if (book) {
      res.download(__dirname + `/../public/books/${book.fileBook}`, (err: Error) => {
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

export default router;
