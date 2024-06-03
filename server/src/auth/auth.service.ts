import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtConfig } from "src/config/configuration";
import { JwtPayload } from "./interfaces/jwtPayload";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await compare(password, user.password)))
      throw new BadRequestException("Invalid email or password.");

    return this.generateTokens({ userId: user.id });
  }

  async refresh({ token }: RefreshDto) {
    const { REFRESH_SECRET } = this.config.get<JwtConfig>("JWT")!;

    const { userId } = await this.jwt
      .verifyAsync(token, {
        secret: REFRESH_SECRET,
      })
      .catch((e) => {
        throw new BadRequestException("Invalid token");
      });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
      },
    });

    if (!user) throw new BadRequestException("Invalid token payload");

    return this.generateTokens({ userId: user.id });
  }

  private async generateTokens({ userId }: JwtPayload) {
    const { ACCESS_SECRET, REFRESH_SECRET, ACCESS_EXPIRES, REFRESH_EXPIRES } =
      this.config.get<JwtConfig>("JWT")!;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        { userId },
        { secret: ACCESS_SECRET, expiresIn: ACCESS_EXPIRES },
      ),
      this.jwt.signAsync(
        { userId },
        { secret: REFRESH_SECRET, expiresIn: REFRESH_EXPIRES },
      ),
    ]);

    const { exp: accessExp } = this.jwt.decode<{ exp: number }>(accessToken);
    const { exp: refreshExp } = this.jwt.decode<{ exp: number }>(refreshToken);

    return {
      accessToken,
      refreshToken,
      accessExp,
      refreshExp,
    };
  }
}
