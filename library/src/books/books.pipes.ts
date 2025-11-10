import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class BookBodyValidation implements PipeTransform {
  public transform(bookData: any) {
    if (bookData.title.length < 3) {
      throw new BadRequestException("Book's title is too short");
    }

    return bookData;
  }
}

@Injectable()
export class BookIdValidation implements PipeTransform {
  public transform(bookId: any) {
    if (/\W+/.test(bookId)) {
      throw new BadRequestException("Wrong id");
    }

    return bookId;
  }
}
