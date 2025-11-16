import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { getModelToken } from "@nestjs/mongoose";
import { INestApplication } from "@nestjs/common";
import { BooksModule } from "../books.module";
import { BooksService } from "../books.service";
import { Book } from "../../schemas/book.schema";
import { JwtAuthGuard } from "../../auth/guards/jwt.auth.guard";

describe("BookController", () => {
  let app: INestApplication;
  const mockBooks = [
    {
      _id: "n8h9mfvd7gf43fn37f363",
      title: 'Мёртвые души',
      description: 'Классика',
      authors: 'Н. В. Гоголь',
      favorite: true,
      comments: [],
    },
    {
      _id: "fh79shkmfd978grafafdfa",
      title: 'Мастер и Маргарита',
      description: 'Классика',
      authors: 'М. А. Булгаков',
      favorite: true,
      comments: [],
    },
  ];

  const bookDto = {
    title: 'Отцы и дети',
    description: 'Классика',
    authors: 'И. С. Тургенев',
    favorite: true,
    comments: [],
  };

  let booksService = {
    getBooks: jest.fn(),
    createBook: jest.fn(),
    getBook: jest.fn(),
    updateBook: jest.fn(),
    deleteBook: jest.fn(),
  };

  const mockBookModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn().mockImplementation((context) => {
      return Promise.resolve(true);
    }),
  }

  beforeAll(async () => {
    const BooksTestingModule: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(getModelToken(Book.name))
      .useValue(mockBookModel)
      .overrideProvider(BooksService)
      .useValue(booksService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    app = BooksTestingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/GET books", async () => {
    booksService.getBooks.mockReturnValue(mockBooks);
    const response = await request(app.getHttpServer())
      .get("/books")
      .expect(200)
      .expect(booksService.getBooks());

    expect(response.body).toEqual(mockBooks);
  });

  it("/POST book", async () => {
    booksService.createBook.mockReturnValue(bookDto);
    const response = await request(app.getHttpServer())
      .post("/books")
      .send(bookDto)
      .expect(201)
      .expect(booksService.createBook(bookDto));

    expect(response.body).toEqual(bookDto);
  });

  it("/GET book", async () => {
    const wantedBook = mockBooks[0];
    booksService.getBook.mockReturnValue(wantedBook);
    const response = await request(app.getHttpServer())
      .get(`/books/${wantedBook._id}`)
      .expect(200)
      .expect(booksService.getBook());

    expect(response.body).toEqual(wantedBook);
  });

  it("/PUT book", async () => {
    const bookId = mockBooks[0]._id;
    const updatedBookDto = {
      authors: "Н. Гоголь",
    };

    const updatedBook = {
      ...mockBooks[0],
      ...updatedBookDto,
    };

    const expected = {
      ...updatedBook,
      _id: bookId,
    };

    booksService.updateBook.mockReturnValue(expected);
    const response = await request(app.getHttpServer())
      .put(`/books/${bookId}`)
      .send(updatedBook)
      .expect(200)
      .expect(booksService.updateBook(updatedBook));

    expect(response.body).toMatchObject(expected);
  });

  it("/DELETE book", async () => {
    booksService.deleteBook.mockReturnValue({ deleted: true });
    const response = await request(app.getHttpServer())
      .delete(`/books/${mockBooks[0]._id}`)
      .expect(200)
      .expect(booksService.deleteBook());

    expect(response.body).toMatchObject({ deleted: true });
  });
});