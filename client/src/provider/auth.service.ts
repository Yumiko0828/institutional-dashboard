import { AxiosError } from "axios";
import { api } from "./api";
import { ApiAuth, ApiError, ApiUser } from "./api.definitions";

export class AuthService {
  static instance: AuthService;

  static getInstance(): AuthService {
    if (!this.instance) {
      this.instance = new AuthService();
    }

    return this.instance;
  }

  async login(c: Record<"email" | "password", string>) {
    try {
      const { data: tokens } = await api.post<ApiAuth>("/auth/login", c);
      const { data: user } = await api.get<ApiUser>("/users/whoami", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });

      if (!user || !tokens) {
        throw new Error("Failed to retrieve user or tokens");
      }

      return {
        ...user,
        tokens,
      };
    } catch (error) {
      const e: AxiosError<ApiError> = error,
        { message } = e.response!.data;
      throw new Error(
        Array.isArray(message)
          ? message[0]
          : message || "Credenciales inválidas"
      );
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const { data } = await api.post<ApiAuth>("/auth/refresh", {
        token: refreshToken,
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
