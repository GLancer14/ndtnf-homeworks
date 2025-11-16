import { Injectable } from '@nestjs/common';
import { BookDto, UpdateBookDto } from './types/dto/books-dto.types';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Book as BookSchema, BookDocument } from '../schemas/book.schema';
import { Connection, Model } from 'mongoose';

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
    return this.BookModel.create(book);
  }

  getBook(id: string): Promise<BookDocument | null> {
    return this.BookModel.findById(id).exec();
  }

  updateBook(id: string, book: UpdateBookDto): Promise<BookDocument | null> {
    return this.BookModel.findOneAndUpdate(
      { _id: id },
      book,
      { new: true },
    ).exec();
  }

  deleteBook(id: string): Promise<BookDocument | null> {
    return this.BookModel.findOneAndDelete({ _id: id }).exec();
  }
}
