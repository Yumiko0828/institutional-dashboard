import { NextFunction, Request, Response } from "express";
import { prisma } from "../../db.js";
import { badImplementation, badRequest } from "@hapi/boom";
import {
  RegisterSectionBody,
  UpdateSectionBody,
} from "../../validators/section.validator.js";

export class SectionsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const sections = await prisma.section.findMany({
        orderBy: {
          grade: {
            discriminator: "asc",
          },
        },
      });

      res.json(sections);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const section = await prisma.section.findUnique({ where: { id } });

      if (!section) return next(badRequest("Unknown section"));

      res.json(section);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { gradeId, section }: RegisterSectionBody = req.body;

      const createdSection = await prisma.section.create({
        data: {
          section,
          gradeId,
        },
      });

      res.json(createdSection);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { section, gradeId }: UpdateSectionBody = req.body;
      const { id } = req.params;

      const updatedSection = await prisma.section.update({
        where: {
          id,
        },
        data: {
          gradeId,
          section,
        },
      });

      res.json(updatedSection);
    } catch (e) {
      next(badImplementation(e.message));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deletedSection = await prisma.section.delete({ where: { id } });

      res.json(deletedSection);
    } catch (e) {
      badImplementation(e.message);
    }
  }
}
