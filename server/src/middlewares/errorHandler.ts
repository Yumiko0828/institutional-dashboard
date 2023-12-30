import { badImplementation, isBoom } from "@hapi/boom";
import { Request, Response } from "express";

export function errorHandler(err: any, _req: Request, res: Response) {
  if (err && isBoom(err))
    return res.status(err.output.statusCode).json(err.output.payload);

  res.status(500).json(badImplementation(err).output.payload);
}
