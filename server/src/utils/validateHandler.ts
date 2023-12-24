import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateHandler(property: keyof Request, schema: ObjectSchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await schema.validateAsync(req[property]);
      next();
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
    }
  };
}
