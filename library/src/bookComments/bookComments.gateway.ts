import { Inject, UseFilters, UsePipes } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WsException } from "@nestjs/websockets";
import { BooksCommentsService } from "./bookComments.service";
import { type BookCommentDto } from "./types/dto/bookComment";
import { WsExceptionFilter } from "./bookComments.exceptionFilter";
import { addBookCommentValidationPipe } from "../validation/bookComments.pipe";
import { addBookCommentSchema } from "../validation/schemas/bookComments.schema";

@UseFilters(new WsExceptionFilter())
@WebSocketGateway()
export class BooksCommentsGateway {
  constructor(
    @Inject(BooksCommentsService) private booksCommentsService: BooksCommentsService
  ) {}

  @SubscribeMessage("all-comments")
  async getAllComments(@MessageBody("bookId") bookId: number) {
    if (!bookId) {
      throw new WsException("Bad websocket message");
    }

    return await this.booksCommentsService.findAllBookComments(bookId);
  }

  @UsePipes(new addBookCommentValidationPipe(addBookCommentSchema))
  @SubscribeMessage("add-comment")
  addComment(@MessageBody() data: BookCommentDto) {
    return this.booksCommentsService.addBookComment(data.bookId, data.comment);
  }
}