import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";
import { PERMS_KEY, PermsLevel } from "./permissions.decorator";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const { userId } = ctx.switchToHttp().getRequest();

    if (!userId) throw new BadRequestException("Missing user id");

    const perms = this.reflector.getAllAndOverride<PermsLevel>(PERMS_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!perms) return true;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException("Invalid user id");

    return user.permissionsLevel >= perms;
  }
}
