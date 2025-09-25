import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { prisma } from "./prisma";
import { compare, hash } from "bcrypt";
import { z } from "zod";

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Email and password",
      authorize: async (credentials) => {
        try {
          console.log("Authorize called with credentials:", credentials);
          const parsed = CredentialsSchema.safeParse(credentials);
          if (!parsed.success) {
            console.error("Credentials validation failed:", parsed.error);
            throw new Error("Invalid credentials");
          }
          const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
          if (!user) {
            console.error("No user found for email:", parsed.data.email);
            return null;
          }
          if (!user.passwordHash) {
            console.error("User found but passwordHash missing:", user);
            return null;
          }
          const ok = await compare(parsed.data.password, user.passwordHash);
          if (!ok) {
            console.error("Password comparison failed for user:", user.email);
            return null;
          }
          console.log("User authorized:", user.email);
          return { id: user.id, email: user.email, name: user.name, image: user.image };
        } catch (err) {
          console.error("Error in authorize:", err);
          throw err;
        }
      },
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true }
      }
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      try {
        console.log("Session callback called with:", { session, token });
        if (token && token.sub) {
          if (session.user) {
            (session.user as typeof session.user & { id?: string }).id = token.sub;
            console.log("Added id to session.user:", token.sub);
          } else {
            console.warn("Session.user is missing in session callback.");
          }
        } else {
          console.warn("Token.sub is missing in session callback.");
        }
        return session;
      } catch (err) {
        console.error("Error in session callback:", err);
        throw err;
      }
    }
  }
});
