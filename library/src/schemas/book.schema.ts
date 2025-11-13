import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  public title: string;

  @Prop()
  public description: string;

  @Prop({ required: true })
  public authors: string;

  @Prop()
  public favorite: boolean;

  @Prop()
  public comments: Array<{ username: string; message: string }>;
}

export const BookSchema = SchemaFactory.createForClass(Book);