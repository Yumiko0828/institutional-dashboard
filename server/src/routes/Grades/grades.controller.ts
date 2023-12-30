import { NextFunction, Request, Response } from "express";
import { badImplementation } from "@hapi/boom";
import {
  CreateGradeBody,
  UpdateGradeBody,
} from "../../validators/grade.validator.js";
import { prisma } from "../../db.js";

export class GradesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const grades = await prisma.grade.findMany();

      res.json(grades);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const grade = await prisma.grade.findUnique({ where: { id } });

      res.json(grade);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const gradeData: CreateGradeBody = req.body;

    try {
      const grade = await prisma.grade.create({ data: gradeData });

      res.json(grade);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const gradeData: UpdateGradeBody = req.body;

    try {
      const grade = await prisma.grade.update({
        where: {
          id,
        },
        data: gradeData,
      });

      res.json(grade);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const grade = await prisma.grade.delete({
        where: {
          id,
        },
      });

      res.json(grade);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }
}
