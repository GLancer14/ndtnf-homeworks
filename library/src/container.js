const { Container } = require("inversify");
const { BookRepository } = require("./BooksRepository");

const container = new Container();
container.bind(BookRepository).toSelf();

exports.container = container;