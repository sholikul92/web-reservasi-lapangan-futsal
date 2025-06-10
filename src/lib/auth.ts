import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/app/utils/bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { schemaSignIn } from "@/app/lib/schema";

export const authOption: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const parsed = schemaSignIn.safeParse(credentials);
          if (!parsed.success) throw new Error(parsed.error.errors[0].message);

          const user = await prisma.user.findUnique({
            where: {
              email: parsed.data.email,
            },
          });

          if (!user) throw new Error("Pengguna tidak terdaftar");

          const isValid = await comparePassword(parsed.data.password, user.password);

          if (!isValid) throw new Error("Password Salah");

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error", error);
          throw new Error(error as string);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
