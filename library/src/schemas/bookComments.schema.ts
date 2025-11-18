import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookCommentsDocument = BookComments & Document;

@Schema()
export class BookComments {
  @Prop({ required: true })
  public bookId: number;

  @Prop({ required: true })
  public comment: string;
}

export const BookCommentsSchema = SchemaFactory.createForClass(BookComments);