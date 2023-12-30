import { NextFunction, Request, Response } from "express";
import { badImplementation, badRequest } from "@hapi/boom";
import { compare } from "bcrypt";
import { signAsync, verifyAsync } from "../../utils/jwt.js";
import { RefreshBody, SigninBody } from "../../validators/auth.validator.js";
import { prisma } from "../../db.js";

export class AuthController {
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: SigninBody = req.body;

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user || !(await compare(password, user.password)))
        return next(badRequest("Invalid credentials"));

      const [access_token, refresh_token] = await Promise.all([
        signAsync({ userId: user.id }, "access"),
        signAsync({ userId: user.id }, "refresh"),
      ]);

      res.json({
        access_token,
        refresh_token,
      });
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    const { refreshToken }: RefreshBody = req.body;

    try {
      const { userId } = await verifyAsync(refreshToken, "refresh");
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) return next(badRequest("Invalid token"));

      const [access_token, refresh_token] = await Promise.all([
        signAsync({ userId }, "access"),
        signAsync({ userId }, "refresh"),
      ]);

      res.json({
        access_token,
        refresh_token,
      });
    } catch (e) {
      next(badImplementation(e.message));
    }
  }
}
