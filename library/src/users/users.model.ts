import { Schema, model } from "mongoose";

const usersSchema = new Schema({
  username: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

export default model("Users", usersSchema);