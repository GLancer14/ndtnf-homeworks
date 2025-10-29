import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public authors: string;

  @Prop()
  public favorite: boolean;

  @Prop()
  public comments: Array<{ username: string; message: string }>;
}

export const BookSchema = SchemaFactory.createForClass(Book);