import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JwtConfig } from "src/config/configuration";
import { JwtPayload } from "./interfaces/jwtPayload";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest(),
      authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedException("Missing auth header");

    if (!this.isValidHeader(authHeader)) throw new UnauthorizedException();

    const token = authHeader.slice(7),
      { ACCESS_SECRET } = this.config.get<JwtConfig>("JWT")!;

    try {
      const { userId } = await this.jwt.verifyAsync<JwtPayload>(token, {
        secret: ACCESS_SECRET,
      });

      req["userId"] = userId;

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  isValidHeader(header: string): boolean {
    if (header.length >= 200)
      throw new ForbiddenException("Header length is too long.");

    const splitHeader = header.trim().split(" ");
    if (splitHeader.length !== 2) return false;

    return splitHeader[0].toLowerCase() === "bearer";
  }
}
