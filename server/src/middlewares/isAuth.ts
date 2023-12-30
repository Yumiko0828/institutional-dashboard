import { NextFunction, Request, Response } from "express";
import { unauthorized } from "@hapi/boom";
import { verifyAsync } from "../utils/jwt.js";
import { prisma } from "../db.js";

export function isAuth(req: Request, _res: Response, next: NextFunction) {
  const token: string | undefined = req.headers.authorization;

  if (!token || !/[Bb]earer /.test(token.slice(0, 7)))
    return next(unauthorized("Invalid auth header"));

  return verifyAsync(token.slice(7), "access")
    .then(({ userId }) =>
      prisma.user.findUnique({
        where: { id: userId },
        include: { accountType: true },
      })
    )
    .then((user) => {
      if (!user) return next(unauthorized("Unknown user"));

      req.user = user.id;
      req.userType = user.accountType;

      return next();
    })
    .catch((e) => {
      next(unauthorized(e.message));
    });
}
