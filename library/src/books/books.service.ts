import { Injectable } from '@nestjs/common';
import { Book } from './types/books.types';

@Injectable()
export class BooksService {
  protected books: Book[] = [];

  getBooks() {
    return this.books;
  }

  createBook(book: Book) {
    this.books.push(book);
  }

  getBook(id: string) {
    return this.books.find(book => book.id === id);
  }

  updateBook(id: string, book: Book) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
      this.books[bookIndex] = {
        ...this.books[bookIndex],
        ...book,
      };
      return book;
    }
  }

  deleteBook(id: string) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
      return bookIndex;
    }
  }
}
