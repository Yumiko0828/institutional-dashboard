import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAssistanceDto } from "./dto/create.dto";

@Injectable()
export class AssistanceService {
  constructor(private readonly prisma: PrismaService) {}

  async retrieve(scheduleId: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: scheduleId },
      select: { id: true },
    });

    if (!schedule) throw new NotFoundException("Schedule not found");

    return this.prisma.assistance.findMany({
      where: {
        scheduleId: schedule.id,
      },
      orderBy: {
        date: "asc",
      },
    });
  }

  async create({ scheduleId, presents, lates, absences }: CreateAssistanceDto) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: scheduleId },
      select: { id: true },
    });

    if (!schedule) throw new NotFoundException("Schedule not found");

    return this.prisma.assistance.create({
      data: {
        scheduleId: schedule.id,
        presents: {
          connect: presents.map((id) => ({ id })),
        },
        lates: {
          connect: lates.map((id) => ({ id })),
        },
        absences: {
          connect: absences.map((id) => ({ id })),
        },
      },
    });
  }
}
