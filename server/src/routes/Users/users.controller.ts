import { Request, Response } from "express";
import { prisma } from "../../db.js";
import {
  RegisterUserBody,
  UpdateUserBody,
} from "../../validators/user.validator.js";

export class UsersController {
  async profile(req: Request, res: Response) {
    const userId = req.user!;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: false,
          accountTypeId: true,
        },
      });

      res.json(user);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }

  async register(req: Request, res: Response) {
    const {
      firstName,
      lastName,
      email,
      accountTypeId,
      password,
    }: RegisterUserBody = req.body;

    try {
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          accountTypeId,
        },
      });

      res.json(user);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    const { userId } = req.params;
    const body: UpdateUserBody = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: body,
      });

      res.json(updatedUser);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const user = await prisma.user.delete({ where: { id: userId } });

      res.json(user);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }
}
