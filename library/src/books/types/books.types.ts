export interface Book {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  comments: Array<{username: string; message: string}>;
}

export interface BookDto {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  comments: Array<{username: string; message: string}>;
}