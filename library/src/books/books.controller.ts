import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { type Request, type Response } from 'express';
import { type HydratedDocument, type QueryWithHelpers } from 'mongoose';
import { BooksService } from './books.service';
import { type UpdateBookDto, type BookDto } from './types/dto/books-dto.types';
import { BookDocument } from 'src/schemas/book.schema';

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(): Promise<BookDocument[]> {
    return await this.booksService.getBooks();
  }

  @Post()
  async createBook(@Body() book: BookDto): Promise<BookDocument> {
    return await this.booksService.createBook(book);
  }

  @Get(":id")
  async getBook(@Param("id") id: string, @Res() res: Response): Promise<BookDocument | null> {
    const book = await this.booksService.getBook(id);
    if (!book) {
      res.status(404);
      res.send("Book doesn't found");
    } else {
      res.json(book);
    }

    return book;
  }

  @Put(":id")
  async updateBook(
    @Req() req: Request,
    @Res() res: Response,
    @Body() book: UpdateBookDto,
  ): Promise<QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument>> {
    const updatedBook = await this.booksService.updateBook(req.params.id, book);
    if (!updatedBook) {
      res.status(404);
      res.send("Book doesn't found");
    } else {
      res.redirect("/");
    }

    return updatedBook;
  }

  @Delete(":id")
  async deleteBook(
    @Param("id") id: string,
    @Res() res: Response
  ): Promise<QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument>> {
    const deletedBook = await this.booksService.deleteBook(id);
    if (deletedBook) {
      res.redirect("/");
    } else {
      res.status(404);
      res.send("Book doesn't found");
    }
    
    return deletedBook;
  }
}
