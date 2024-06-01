import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterStudentsDto } from "./dto/register.dto";
import { UpdateStudentDto } from "./dto/update.dto";

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(grade: number, section: string, page: number) {
    const take = 30,
      skip = take * (page - 1);

    return this.prisma.student.findMany({
      where: {
        grade: {
          label: grade,
          section,
        },
      },
      orderBy: {
        lastName: "asc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        grade: {
          select: {
            label: true,
            id: true,
            section: true,
            academicLevel: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      skip,
      take,
    });
  }

  async register({ data }: RegisterStudentsDto) {
    return this.prisma.student.createManyAndReturn({
      data,
      select: {
        id: true,
      },
      skipDuplicates: true,
    });
  }

  async update(id: string, { firstName, lastName, gradeId }: UpdateStudentDto) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!student) throw new NotFoundException("Student not found");

    return this.prisma.student.update({
      where: { id: student.id },
      data: {
        firstName,
        lastName,
        gradeId,
      },
    });
  }

  async delete(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!student) throw new NotFoundException("Student not found");

    return this.prisma.student.delete({
      where: { id },
      select: { id: true },
    });
  }
}
