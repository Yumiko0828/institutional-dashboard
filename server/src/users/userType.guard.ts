import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./userType.decorator";
import { UserType } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const { userId } = ctx.switchToHttp().getRequest();

    if (!userId) throw new BadRequestException("Missing user id");

    const userTypes = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!userTypes) return true;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        type: true,
        id: true,
      },
    });

    if (!user) throw new BadRequestException("Invalid user id");

    return userTypes.some((t) => t === user.type);
  }
}
