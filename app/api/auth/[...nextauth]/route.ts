import prisma from "@/prisma/prismaClient";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: any = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials) {
        const user = prisma?.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        // const isCorrectPassword = await bcrypt.compare(
        //   credentials?.password as string,
        //   user.hashedPassword
        // );

        // if (!isCorrectPassword) {
        //   throw new Error("Wrong password");
        // }

        return user;
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
  secret: process.env.NEXTAUTH_SECRET!,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
