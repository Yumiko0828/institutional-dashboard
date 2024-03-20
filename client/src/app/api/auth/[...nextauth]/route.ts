import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      type: "credentials",
      authorize(credentials, req) {


        return {
          id: "1",
          name: "",
          email: "",
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
