import { NextFunction, Request, Response } from "express";
import {
  CreateStudentBody,
  UpdateStudentBody,
} from "../../validators/student.validator.js";
import { prisma } from "../../db.js";
import { badImplementation } from "@hapi/boom";

export class StudentsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.student.findMany();

      res.json(users);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user = await prisma.student.findUnique({ where: { id } });

      res.json(user);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const studentData: CreateStudentBody = req.body;

    try {
      const student = await prisma.student.create({ data: studentData });

      res.json(student);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const studentData: UpdateStudentBody = req.body;

    try {
      const student = await prisma.student.update({
        where: {
          id,
        },
        data: studentData,
      });

      res.json(student);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const user = await prisma.student.delete({
        where: {
          id,
        },
      });

      res.json(user);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }
}
