interface Book {
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileName: string;
  fileBook: string;
  comments: string[];
}

abstract class BookRepository {
  abstract createBook(book: Book): void;
  abstract getBook(id: number): Book | null;
  abstract getBooks(): Book[];
  abstract updateBook(id: number, updatedBook: Book): void;
  abstract deleteBook(id: number): void;
}