import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books/books.service';

@Controller()
export class AppController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }
}
