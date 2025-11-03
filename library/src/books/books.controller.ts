import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  async getBook(@Param("id") id: string): Promise<BookDocument> {
    const book = await this.booksService.getBook(id);
    if (!book) {
      throw new NotFoundException("Book doesn't found");
    }

    return book;
  }

  @Put(":id")
  async updateBook(
    @Param("id") id: string,
    @Body() book: UpdateBookDto,
  ): Promise<BookDocument> {
    const updatedBook = await this.booksService.updateBook(id, book);
    if (!updatedBook) {
      throw new NotFoundException("Book doesn't found");
    }

    return updatedBook;
  }

  @Delete(":id")
  async deleteBook(@Param("id") id: string): Promise<{ deleted: boolean }> {
    const deletedBook = await this.booksService.deleteBook(id);
    if (!deletedBook) {
      throw new NotFoundException("Book doesn't found");
    }
    
    return { deleted: true };
  }
}
