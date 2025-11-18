import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BooksCommentsService } from "./bookComments.service";
import { BookComments, BookCommentsSchema } from "../schemas/bookComments.schema";
import { BooksCommentsGateway } from "./bookComments.gateway";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: BookComments.name, schema: BookCommentsSchema }]),
  ],
  providers: [BooksCommentsService, BooksCommentsGateway]
})
export class BookCommentsModule {}
