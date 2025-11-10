export interface BookDto {
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  comments: Array<{username: string; message: string}>;
}

export interface UpdateBookDto {
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  comments: Array<{username: string; message: string}>;
}