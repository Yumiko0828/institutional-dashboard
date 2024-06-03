import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (!token || (token && token.error === "RefreshAccessTokenError")) {
        return false;
      }

      return true;
    },
  },
});

export const config = {
  matcher: ["/dash/:path*"],
};
