import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export const createSchema = Joi.object({
  type: Joi.string().valid("income", "expense").required(),
  amount: Joi.number().positive().required(),
  description: Joi.string().allow("").max(500),
  category: Joi.string().allow("").max(100),
  date: Joi.date().iso().required(),
});

export const updateSchema = Joi.object({
  type: Joi.string().valid("income", "expense"),
  amount: Joi.number().positive(),
  description: Joi.string().allow("").max(500),
  category: Joi.string().allow("").max(100),
  date: Joi.date().iso(),
}).min(1);
