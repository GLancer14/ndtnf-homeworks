import Joi from "joi";

export const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(18).required(),
  firstName: Joi.string().min(2).max(32).required(),
  lastName: Joi.string().min(2).max(32).optional(),
});
