import { Handler } from "../utils/handler.js";

export const onlyRoles = (...roles: string[]) =>
  Handler((req, res, next) => {
    if (!req.userType)
      return res.status(401).json({
        message: "You aren't authenticated.",
      });

    if (!req.userType.roles.some((r) => roles.includes(r)))
      return res.status(403).json({
        message: "You not have access from this endpoint.",
      });

    next();
  });
