import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateScheduleDto } from "./dto/create.dto";

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}

  async retrieve() {
    return this.prisma.schedule.findMany({
      orderBy: {
        lea: "asc",
      },
    });
  }

  async create({ lea, gradeId }: CreateScheduleDto) {
    const existSchedule = await this.prisma.schedule.findUnique({
      where: { lea },
      select: { id: true },
    });

    if (existSchedule) throw new BadRequestException("Schedule already exist");

    const grade = await this.prisma.grade.findUnique({
      where: { id: gradeId },
      select: { id: true },
    });

    if (!grade) throw new NotFoundException("Grade not found");

    return this.prisma.schedule.create({
      data: {
        lea,
        gradeId,
      },
    });
  }

  async delete(id: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!schedule) throw new NotFoundException("Schedule not found");

    return this.prisma.schedule.delete({
      where: { id: schedule.id },
      select: { id: true },
    });
  }
}
