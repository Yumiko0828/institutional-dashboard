// Validate Request Body

import Joi from "joi";
import { Handler } from "../utils/handler.js";

export const vrb = <TSchema = any>(schema: Joi.ObjectSchema<TSchema>) =>
  Handler(async (req, res, next) => {
    const data = schema.validate(req.body);

    if (!!data.value && data.error)
      return res.status(400).json({
        message: data.error.message,
      });

    req.body = data.value;

    next();
  });
