import {
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { type ObjectSchema } from "joi";

@Injectable()
export class addBookCommentValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new WsException("Bad websocket message");
    }

    return value;
  }
}
