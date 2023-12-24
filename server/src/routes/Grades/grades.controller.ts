import { Request, Response } from "express";
import { prisma } from "../../db.js";
import {
  CreateGradeBody,
  UpdateGradeBody,
} from "../../validators/grade.validator.js";

export class GradesController {
  async getAll(req: Request, res: Response) {
    try {
      const grades = await prisma.grade.findMany();

      res.json(grades);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const grade = await prisma.grade.findUnique({ where: { id } });

      res.json(grade);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }

  async create(req: Request, res: Response) {
    const gradeData: CreateGradeBody = req.body;

    try {
      const grade = await prisma.grade.create({ data: gradeData });

      res.json(grade);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }

  async update(req: Request, res: Response) {
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
      res.status(400).json({
        message: e.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const grade = await prisma.grade.delete({
        where: {
          id,
        },
      });

      res.json(grade);
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  }
}
