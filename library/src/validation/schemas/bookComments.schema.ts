import Joi from "joi";

export const addBookCommentSchema = Joi.object().keys({
  bookId: Joi.number().required(),
  comment: Joi.string().required(),
});
