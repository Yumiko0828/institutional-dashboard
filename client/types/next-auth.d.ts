import { ApiAuth, ApiUser } from "@/provider/api.definitions";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

export interface Tokens extends ApiAuth {
  accessTokenExpires: number;
  user: User;
}

declare module "next-auth" {
  interface Session {
    user: ApiUser;
    accessToken: string;
    error?: "RefreshAccessTokenError";
  }

  interface User extends ApiUser {
    tokens?: ApiAuth;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends ApiAuth {
    user: ApiUser;
    error?: "RefreshAccessTokenError";
  }
}
