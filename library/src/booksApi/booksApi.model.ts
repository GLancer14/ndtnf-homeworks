import { Schema, model } from "mongoose";

const booksSchema = new Schema({
  title: {
    type: "string",
    default: "",
  },
  description: {
    type: "string",
    default: "",
  },
  authors: {
    type: "string",
    default: "",
  },
  favorite: {
    type: "boolean",
    default: false,
  },
  fileCover: {
    type: "string",
    default: "",
  },
  fileName: {
    type: "string",
    default: "",
  },
  fileBook: {
    type: "string",
    default: "",
  },
  comments: {
    type: [],
  },
});

export default model("Books", booksSchema);