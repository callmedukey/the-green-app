import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import saltAndHashPassword from "./lib/saltAndHashPassword";
import { z } from "zod";
import prisma from "@/lib/prisma";
import testValidPassword from "./lib/tesValidPassword";

export const LoginSchema = z.object({
  username: z.string().min(4).max(14),
  password: z
    .string()
    .min(8)
    .max(20)
    .refine((val) => testValidPassword(val)),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let inputUser = null;

          inputUser = LoginSchema.parse(credentials);

          // logic to salt and hash password
          const pwHash = await saltAndHashPassword(inputUser.password);

          const foundUser = await prisma.user.findFirst({
            where: {
              username: inputUser.username,
              password: pwHash,
            },
          });

          if (!foundUser) {
            return null;
          }

          // return user object with the their profile data
          return { ...foundUser };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }: any) {
      session = {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
});
