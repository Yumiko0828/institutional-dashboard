import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create.dto";
import { hash, genSalt } from "bcrypt";
import { PermsLevel } from "src/auth/permissions/permissions.decorator";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        permissionsLevel: true,
      },
      orderBy: [
        {
          firstName: "asc",
        },
        {
          lastName: "asc",
        },
      ],
    });
  }

  whoami(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        permissionsLevel: true,
      },
    });
  }

  async create({
    firstName,
    lastName,
    email,
    password,
    permissionsLevel,
  }: CreateUserDto) {
    const salt = await genSalt(10);

    if (
      permissionsLevel &&
      !Object.values(PermsLevel).includes(permissionsLevel)
    )
      throw new BadRequestException("Invalid permissions level");

    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: await hash(password, salt),
        permissionsLevel,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        permissionsLevel: true,
      },
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!user) throw new BadRequestException("Invalid user id");

    return this.prisma.user.delete({
      where: {
        id: user.id,
      },
      select: {
        id: true,
      },
    });
  }
}
