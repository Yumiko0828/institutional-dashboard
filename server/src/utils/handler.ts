import { NextFunction, Request, Response } from "express";

type HandlerFunc = (req: Request, res: Response, next: NextFunction) => unknown;

export function Handler(...fn: HandlerFunc[]) {
  return fn;
}
