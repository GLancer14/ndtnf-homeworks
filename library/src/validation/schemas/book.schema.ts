import Joi from "joi";

export const bookSchema = Joi.object().keys({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  authors: Joi.string().required(),
  favorite: Joi.boolean().optional(),
  comments: Joi.array().optional(),
});
