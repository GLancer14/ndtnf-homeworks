import { Injectable } from '@nestjs/common';
import { BookDto, UpdateBookDto } from './types/dto/books-dto.types';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book as BookSchema, BookDocument } from 'src/schemas/book.schema';
import { Connection, HydratedDocument, Model, QueryWithHelpers } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(BookSchema.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  getBooks(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  createBook(book: BookDto): Promise<BookDocument> {
    const newBook = new this.BookModel(book);
    return newBook.save();
  }

  getBook(id: string): Promise<BookDocument | null> {
    return this.BookModel.findById(id).exec();
  }

  updateBook(id: string, book: UpdateBookDto): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
    return this.BookModel.findOneAndUpdate(
      { _id: id },
      book,
    );
  }

  deleteBook(id: string): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
    return this.BookModel.findOneAndDelete({ _id: id });
  }
}
