import fs from "fs";
import { type Book, BookRepository } from "./book.js";
import Books from "./booksApi.model.js";

export class BooksService implements BookRepository {
  async createBook(book: Book) {
    const newBook = new Books(book);
    await newBook.save();
  }
  
  async getBook(id: string): Promise<Book | null> {
    const book = await Books.findById(id);
    if (!book) {
      return null;
    }

    return book;
  }

  async getBooks(): Promise<Book[]> {
    return await Books.find();
  }

  async updateBook(id: string, updatedBook: Book) {
    const book = await Books.findByIdAndUpdate(id, updatedBook);
    if (!book) {
      throw new Error("Book doesn't found");
    }

    if (book.fileBook !== "" && updatedBook.fileBook !== book.fileBook) {
      fs.rm(__dirname + `/../public/books/${book.fileBook}`, err => {
        if (err) {
          throw err;
        }
      });
    }
  }

  async deleteBook(id: string) {
    const book = await Books.findById(id);
    if (!book) {
      throw new Error("Book doesn't found");
    }

    if (book.fileBook !== "") {
      fs.rm(__dirname + `/../public/books/${book.fileBook}`, err => {
        if (err) {
          throw err;
        }
      });
    }

    await Books.deleteOne({ _id: id });
  }
}