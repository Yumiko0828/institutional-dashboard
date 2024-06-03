import { JWT } from "next-auth/jwt";
import { AuthService } from "./auth.service";
import { User } from "next-auth";

export class TokenService {
  static instance: TokenService;

  static getInstance(): TokenService {
    if (!this.instance) {
      this.instance = new TokenService();
    }

    return this.instance;
  }

  authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  async handleToken(token: JWT, user: User): Promise<JWT> {
    if (user) {
      const profile: JWT = {
        accessToken: user.tokens!.accessToken,
        refreshToken: user.tokens!.refreshToken,
        accessExp: user.tokens!.accessExp * 1000,
        refreshExp: user.tokens!.refreshExp * 1000,
        user: {
          id: user.id,
          email: user.email!,
          firstName: user.firstName,
          lastName: user.lastName,
          permissionsLevel: user.permissionsLevel,
        },
      };

      return profile;
    } else if (Date.now() < token.accessExp) {
      return token;
    } else if (Date.now() < token.refreshExp) {
      try {
        const data = await this.authService.refreshAccessToken(
          token.refreshToken
        );

        return {
          ...token,
          ...data,
          accessExp: data.accessExp * 1000,
          refreshExp: data.refreshExp * 1000,
        };
      } catch {
        return { ...token, error: "RefreshAccessTokenError" };
      }
    } else {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }
}
