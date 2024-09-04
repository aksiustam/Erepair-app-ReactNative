import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email Şifre Giriniz!");
        }

        const admin = await prisma.Admin.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!admin || !admin.password) {
          throw new Error("Bu kullanıcı kayıtlı değil");
        }

        const comparePassword = await bcryptjs.compare(
          credentials.password,
          admin.password
        );

        if (!comparePassword) {
          throw new Error("Şifreniz Yanlış!");
        }

        return admin;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
