export interface Book {
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileName: string;
  fileBook: string;
  comments: Array<{username: string; message: string}>;
}

export abstract class BookRepository {
  abstract createBook(book: Book): void;
  abstract getBook(id: string): Promise<Book | null>;
  abstract getBooks(): Promise<Book[]>;
  abstract updateBook(id: string, updatedBook: Book): void;
  abstract deleteBook(id: string): void;
}
