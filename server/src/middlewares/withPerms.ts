import { forbidden, unauthorized } from "@hapi/boom";
import { Permissions } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const withPerms = (...perms: Permissions[]) =>
  function (req: Request, _res: Response, next: NextFunction) {
    if (!req.userType) return next(unauthorized("You aren't authenticated."));

    if (!req.userType.permissions.some((r) => perms.includes(r)))
      return next(forbidden("You not have access from this endpoint."));

    next();
  };
