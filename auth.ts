import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  username: z.string(),
  password: z.string()
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        if (parsed.data.username === "admin" && parsed.data.password === "auramarket2026") {
          return {
            id: "admin",
            name: "AuraMarket Admin",
            email: "admin@auramarket.local"
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login"
  },
  session: {
    strategy: "jwt"
  },
  trustHost: true
});
