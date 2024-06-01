import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGradeDto } from "./dto/create.dto";
import { UpdateGradeDto } from "./dto/update.dto";

@Injectable()
export class GradeService {
  constructor(private readonly prisma: PrismaService) {}

  async retrieve() {
    return this.prisma.grade.findMany({
      orderBy: {
        label: "desc",
      },
      select: {
        id: true,
        label: true,
        section: true,
        academicLevel: true,
      },
    });
  }

  retrieveOne(id: string) {
    return this.prisma.grade.findUnique({
      where: { id },
      select: {
        id: true,
        label: true,
        section: true,
        academicLevel: true,
      },
    });
  }

  async create({ label, academicLevelId, section }: CreateGradeDto) {
    const existGrade = await this.prisma.grade.findUnique({
      where: {
        uniqueGrade: {
          label,
          section,
          academicLevelId,
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
        label,
        academicLevelId,
      },
      select: {
        id: true,
        label: true,
        section: true,
        academicLevel: true,
      },
    });
  }

  async update(
    id: string,
    { label, academicLevelId, section }: UpdateGradeDto,
  ) {
    const grade = await this.prisma.grade.findUnique({
      where: { id },
    });

    if (!grade) throw new BadRequestException("Invalid id");

    if (label && label === grade.label) label = undefined;
    if (section && section === grade.section) section = undefined;
    if (academicLevelId && academicLevelId === grade.academicLevelId)
      academicLevelId = undefined;

    if (!label && !section && !academicLevelId)
      throw new BadRequestException("Invalid data");

    if (academicLevelId) {
      const existLevel = await this.prisma.academicLevel.findUnique({
        where: { id: academicLevelId },
      });

      if (!existLevel) throw new BadRequestException("Invalid level id");
    }

    return this.prisma.grade.update({
      where: {
        id: grade.id,
      },
      data: {
        academicLevelId,
        section,
        label,
      },
      select: {
        id: true,
        label: true,
        section: true,
        academicLevel: true,
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
      select: {
        id: true,
      },
    });
  }
}
