import { Container } from "inversify";
import { BooksService } from "../booksApi/booksApi.service.js";
import { UsersService } from "../users/users.service.js";

export const container = new Container();
container.bind(BooksService).toSelf().inSingletonScope();
container.bind(UsersService).toSelf().inSingletonScope();
