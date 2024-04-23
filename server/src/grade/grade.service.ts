import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGradeDto } from "./dto/create.dto";
import { UpdateGradeDto } from "./dto/update.dto";

@Injectable()
export class GradeService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.grade.findMany({
      orderBy: {
        year: "desc",
        section: "asc",
      },
      select: {
        id: true,
        year: true,
        section: true,
        level: true,
      },
    });
  }

  getById(id: string) {
    return this.prisma.grade.findUnique({
      where: { id },
      select: {
        id: true,
        year: true,
        section: true,
        level: true,
        student: {
          orderBy: {
            lastName: "desc",
          },
        },
        _count: {
          select: {
            student: true,
          },
        },
      },
    });
  }

  async create({ year, levelId, section }: CreateGradeDto) {
    const existGrade = await this.prisma.grade.findUnique({
      where: {
        year_section_levelId: {
          year,
          section,
          levelId,
        },
      },
      select: {
        id: true,
      },
    });

    if (existGrade)
      throw new BadRequestException("The grade is already created.");

    return this.prisma.grade.create({
      data: {
        section,
        year,
        levelId,
      },
      select: {
        id: true,
        year: true,
        section: true,
        level: true,
      },
    });
  }

  async update(id: string, { year, levelId, section }: UpdateGradeDto) {
    const grade = await this.prisma.grade.findUnique({
      where: { id },
    });

    if (!grade) throw new BadRequestException("Invalid id");

    if (year && year === grade.year) year = undefined;
    if (section && section === grade.section) section = undefined;
    if (levelId && levelId === grade.levelId) levelId = undefined;

    if (!year && !section && !levelId)
      throw new BadRequestException("Invalid data");

    if (levelId) {
      const existLevel = await this.prisma.level.findUnique({
        where: { id: levelId },
      });

      if (!existLevel) throw new BadRequestException("Invalid level id");
    }

    return this.prisma.grade.update({
      where: {
        id: grade.id,
      },
      data: {
        levelId,
        section,
        year,
      },
      select: {
        id: true,
        year: true,
        section: true,
        level: true,
      },
    });
  }

  async delete(id: string) {
    const grade = await this.prisma.grade.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!grade) throw new BadRequestException("Invalid id");

    return this.prisma.grade.delete({
      where: { id: grade.id },
    });
  }
}
