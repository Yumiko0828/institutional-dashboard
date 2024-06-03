import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { AuthService } from "@/provider/auth.service";
import { TokenService } from "@/provider/token.service";

const authService = AuthService.getInstance();
const tokenService = TokenService.getInstance();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(c /* -> credentials */) {
        return await authService.login(c!);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return await tokenService.handleToken(token, user);
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
