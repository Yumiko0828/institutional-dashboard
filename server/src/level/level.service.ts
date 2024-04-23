import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLevelDto } from "./dto/create.dto";
import { UpdateLevelDto } from "./dto/update.dto";

@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.level.findMany();
  }

  async getById(id: string) {
    const academicLevel = await this.prisma.level.findUnique({ where: { id } });

    if (!academicLevel) throw new BadRequestException("Invalid level id");

    return academicLevel;
  }

  create({ name }: CreateLevelDto) {
    return this.prisma.level.create({
      data: {
        name,
      },
    });
  }

  async update(id: string, { name }: UpdateLevelDto) {
    await this.getById(id);

    return this.prisma.level.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return this.prisma.level.delete({
      where: { id },
    });
  }
}
