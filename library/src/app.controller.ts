import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books/books.service';

@Controller()
export class AppController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks() {
    return await this.booksService.getBooks();
  }
}
