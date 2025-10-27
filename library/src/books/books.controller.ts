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
import { BooksService } from './books.service';
import { type Request, type Response } from 'express';
import { type BookDto } from './types/books.types';

@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @Post()
  createBook(@Body() book: BookDto) {
    this.booksService.createBook(book);
    return "Book successfully added";
  }

  @Get(":id")
  getBook(@Param("id") id: string, @Res() res: Response) {
    const book = this.booksService.getBook(id);
    if (!book) {
      res.status(404);
      res.send("Book doesn't found");
    }
    
    res.json(book);
  }

  @Put(":id")
  updateBook(
    @Req() req: Request,
    @Res() res: Response,
    @Body() book: BookDto,
  ) {
    const existsBook = this.booksService.updateBook(req.params.id, book);
    if (!existsBook) {
      res.status(404);
      return res.send("Book doesn't found");
    }

    res.redirect("/");
  }

  @Delete(":id")
  deleteBook(@Param("id") id: string, @Res() res: Response) {
    const bookIndex = this.booksService.deleteBook(id);
    if (bookIndex) {
      res.redirect("/");
    } else {
      res.status(404);
      res.send("Book doesn't found");
    }
  }
}
