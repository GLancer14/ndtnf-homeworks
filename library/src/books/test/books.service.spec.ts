import { Test, TestingModule } from "@nestjs/testing";
import { BooksService } from "../books.service";
import { getModelToken } from "@nestjs/mongoose";
import { Book, BookDocument } from "../../schemas/book.schema";
import { Connection, Model } from "mongoose";

describe("BookService", () => {
  let booksService: BooksService;
  let model: Model<BookDocument>;

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

  const mockBookModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const BooksModule: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel,
        },
        {
          provide: "DatabaseConnection",
          useValue: Connection,
        }
      ],
    }).compile();

    booksService = BooksModule.get<BooksService>(BooksService);
    model = BooksModule.get<Model<BookDocument>>(getModelToken(Book.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe("get all books", () => {
    it("should return all books", async () => {
      mockBookModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockBooks),
      });
      const result = await booksService.getBooks();

      expect(mockBookModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockBooks);
    })
  });

  describe("get book by id", () => {
    it("should return one specific book", async () => {
      const wantedBook = mockBooks[0];

      mockBookModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(wantedBook),
      });
      const result = await booksService.getBook(wantedBook._id);

      expect(mockBookModel.findById).toHaveBeenCalled();
      expect(result).toEqual(wantedBook);
    })
  });

  describe("create book", () => {
    it("should create book and return it", async () => {
      const bookDto = {
        title: 'Отцы и дети',
        description: '',
        authors: 'И. С. Тургенев',
        favorite: true,
        comments: [],
      };

      const savedBook = {
        ...bookDto,
        _id: "ftg7hkdf7hgh6sfdgssf67",
      };

      mockBookModel.create = jest.fn().mockResolvedValue(savedBook);
      const result = await booksService.createBook(bookDto);

      expect(mockBookModel.create).toHaveBeenCalled();
      expect(result).toEqual(savedBook);
    })
  });

  describe("update book", () => {
    it("should update book and return it", async () => {
      const bookId = mockBooks[0]._id;
      const updatedBookDto = {
        authors: 'Н. Гоголь',
      };

      const updatedBook = {
        ...mockBooks[0],
        ...updatedBookDto,
      };

      const expected = {
        ...updatedBook,
        _id: bookId,
      };

      mockBookModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(expected),
      });
      const result = await booksService.updateBook(bookId, updatedBook);

      expect(mockBookModel.findOneAndUpdate).toHaveBeenCalled();
      expect(result).toEqual(expected);
    })
  });

  describe("delete book", () => {
    it("should delete book and return it", async () => {
      const deletedBook = mockBooks[0];

      mockBookModel.findOneAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(deletedBook),
      });
      const result = await booksService.deleteBook(deletedBook._id);

      expect(mockBookModel.findOneAndDelete).toHaveBeenCalled();
      expect(result).toEqual(deletedBook);
    })
  });
});