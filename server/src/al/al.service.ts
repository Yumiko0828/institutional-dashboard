import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAlDto } from "./dto/create.dto";

@Injectable()
export class AlService {
  constructor(private readonly prisma: PrismaService) {}

  async retrieve() {
    return this.prisma.academicLevel.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async create({ name }: CreateAlDto) {
    const existAl = await this.prisma.academicLevel.findUnique({
      where: {
        name,
      },
    });

    if (existAl) throw new BadRequestException("Academic level already exists");

    return this.prisma.academicLevel.create({
      data: {
        name,
      },
    });
  }

  async delete(id: string) {
    const al = await this.prisma.academicLevel.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!al) throw new BadRequestException("Invalid academic level id");

    return this.prisma.academicLevel.delete({
      where: {
        id: al.id,
      },
      select: {
        id: true,
      },
    });
  }
}
