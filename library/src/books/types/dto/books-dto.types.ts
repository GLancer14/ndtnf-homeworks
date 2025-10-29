export interface BookDto {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  comments: Array<{username: string; message: string}>;
}

export interface UpdateBookDto {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  comments: Array<{username: string; message: string}>;
}