import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { BookComments, BookCommentsDocument } from "../schemas/bookComments.schema";

@Injectable()
export class BooksCommentsService {
  constructor(
    @InjectModel(BookComments.name) private BookCommentsModel: Model<BookCommentsDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  findAllBookComments(bookId: number): Promise<BookCommentsDocument[]> {
    return this.BookCommentsModel.find({ bookId }).exec();
  }

  addBookComment(bookId: number, comment: string): Promise<BookCommentsDocument> {
    return this.BookCommentsModel.create({ bookId, comment });
  }

  getBookComment(commentId: string): Promise<BookCommentsDocument | null> {
    return this.BookCommentsModel.findById(commentId).exec();
  }

  updateBookComment(commentId: string, newContent: string): Promise<BookCommentsDocument | null> {
    return this.BookCommentsModel.findByIdAndUpdate(
      commentId,
      { comment: newContent },
      { new: true },
    ).exec();
  }

  deleteBookComment(commentId: string): Promise<BookCommentsDocument | null> {
    return this.BookCommentsModel.findByIdAndDelete(commentId).exec();
  }
}
